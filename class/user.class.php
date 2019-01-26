<?php
require_once 'base.class.php';
require_once 'setting.class.php';
class user extends base{

	public function dataList($searchStr = null){
		try{
			if($searchStr)
				return self::searchText($searchStr);

			if(!self::perm('user','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT u.*,p.name as perm,'no-show' as password from user u inner join perm p on u.id_perm = p.id ORDER BY u.name");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			self::record('user','view','');
			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: [user.class.php/function userList]'.$e->getMessage().'<br>';
		}
	}

	public static function searchText($searchStr){
		try{
			if(!self::perm('user','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$arr_table = array(
				'id'=>array('state'=>'self','field'=>'id'),
				'name'=>array('state'=>'self','field'=>'name'),
				'detail'=>array('state'=>'self','field'=>'detail'),
				'username'=>array('state'=>'self','field'=>'username'),
				'lang'=>array('state'=>'self','field'=>'lang'),
				'idPerm'=>array('state'=>'foreign','table'=>'perm','field'=>'name','source'=>'id_perm'),
				);
			
			self::record('user','search',$searchStr);
			return self::search($searchStr,$arr_table,'user');
		}
		catch(exception $e){
			echo 'Error: [cat.class.php/function search]'.$e->getMessage().'<br>';
			die();
		}
	}

	public function add($var){
		try{
			if(!self::perm('user','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$var['data']['password'] = md5(setting::ENCRYPT_KEY.$var['data']['password']);

			$sql = "INSERT INTO user(name,username,password,id_perm,lang,detail) VALUES('{$var['data']['name']}','{$var['data']['username']}','{$var['data']['password']}','{$var['data']['perm']}','{$var['data']['lang2']}','{$var['data']['detail']}')";
			self::$PDO->query($sql);

			$result = self::$PDO->query("SELECT last_insert_rowid() as lastRow;");
			$row = $result->fetch(PDO::FETCH_ASSOC);
			$lastId = $row['lastRow'];

			self::record('user','add','',$lastId,['new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: user.class > userAdd :: '.$e->getMessage();
		}
	}

	public function delete($var){
		try{
			if(!self::perm('user','delete'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('user',$var['id']);
			$sql = "DELETE FROM user WHERE id = '{$var['id']}';";
			self::$PDO->query($sql);

			self::record('user','delete','',$var['id'],['old'=>$oldData]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: user.class > delete :: '.$e->getMessage();
		}
	}

	public function edit($var){
		try{
			if(!self::perm('user','edit'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);
			$var['data']['pass'] = md5(setting::ENCRYPT_KEY.$var['data']['password']);
			$oldData = self::getRow('user',$var['data']['id']);
			$sql = "UPDATE user SET name = '{$var['data']['name']}', username = '{$var['data']['username']}',password = '{$var['data']['pass']}',id_perm = '{$var['data']['id_perm']}',lang = '{$var['data']['lang2']}',detail = '{$var['data']['detail']}' WHERE id = '{$var['data']['id']}';";
			self::$PDO->query($sql);

			self::record('user','edit','',$var['data']['id'],['old'=>$oldData,'new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: user.class > edit :: '.$e->getMessage();
		}
	}

	

	public function login($data){
		try{
			if($data['password'] === false)
				return json_encode(['Result'=>false,'data'=>'password_number_is_wrong']);
			$result = array();
			$result = ['Result'=>true];
			$pass = md5(setting::ENCRYPT_KEY.$data['password']);
			$r = self::$PDO->query("SELECT id,name,username,id_perm,lang,detail from user  where username = '{$data['username']}' and password = '$pass' limit 1");

			$row = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$row)
				return json_encode(['Result'=>false,'data'=>'Your_Information_Not_Exist']);

			$result['data'] = $row[0];
			// dsh($result);
			$_SESSION = $result['data'];

			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'ERROR: user.class > login :: '.$e->getMessage().'<br>';
			die();
		}
	}

	public function recordActivity($table,$action,$detail,$idtable,$data,$idUser,$ip,$dateTime){
		try{
			self::$PDOACTIVITY->query("INSERT INTO 'log'('id_user','table','action','detail','ip','date','id_table') VALUES('$idUser','$table','$action','$detail','$ip','$dateTime','$idtable')");

			if($data){
				$result = self::$PDOACTIVITY->query("SELECT last_insert_rowid() as lastRow;");
				$row = $result->fetch(PDO::FETCH_ASSOC);
				$idLog = $row['lastRow'];
				if($action == 'edit'){
					foreach ($data['old'] as $key => $value){
						if($value != $data['new'][$key])
							self::$PDOACTIVITY->query("INSERT INTO 'data'(id_log,old,new,name) VALUES('$idLog','$value','{$data['new'][$key]}','$key');");
					}
				}
				else if($action == 'delete'){
					foreach ($data['old'] as $key => $value){
						self::$PDOACTIVITY->query("INSERT INTO 'data'(id_log,old,name) VALUES('$idLog','$value','$key');");
					}
				}
				else if($action == 'add'){
					foreach ($data['new'] as $key => $value){
						self::$PDOACTIVITY->query("INSERT INTO 'data'(id_log,new,name) VALUES('$idLog','$value','$key');");
					}
				}
				else
					return false;
			}
			return true;
		}
		catch(PDOException $e){
			echo 'ERROR: user.class > recordActivity :: '.$e->getMessage().'<br>';
			die();
		}
	}

	public function checkPerm($table,$action,$idPerm,$power = null){
		try{
			if($power)
				return true;
			$sql = "SELECT $table as state FROM perm WHERE id = '$idPerm'";
			$result = self::$PDO->query($sql);
			$row = $result->fetch(PDO::FETCH_ASSOC);
			switch ($action) {
				case 'view':
					return $row['state'][0];
					break;
				case 'add':
					return $row['state'][1];
					break;
				case 'edit':
					return $row['state'][2];
					break;
				case 'delete':
					return $row['state'][3];
					break;
				
				default:
					return false;
					break;
			}
			
			return false;
		}
		catch(PDOException $e){
			echo 'ERROR: user.class > checkPerm :: '.$e->getMessage().'<br>';
			die();
		}
	}

}
$user = new user();

// dsh($user->checkPerm('stuff_cat','view',1));
// dsh($user->List());

?>