<?php
require_once 'base.class.php';
class stuffCat extends base{
	public function stuffCatList($searchStr = null){
		try{
			if($searchStr)
				return self::searchCat($searchStr);

			if(!self::perm('stuff_cat','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT * from stuff_cat order by name");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			self::record('stuff_cat','view','');
			return (json_encode($result));
		}
		catch(PDOException $e){
			echo $e->getMessage();
		}
	}

	public static function searchCat($searchStr){
		try{
			if(!self::perm('stuff_cat','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$arr_table = array(
				'id'=>array('state'=>'self','field'=>'id'),
				'name'=>array('state'=>'self','field'=>'name'),
				'detail'=>array('state'=>'self','field'=>'detail')
				);
			
			self::record('stuff_cat','search',$searchStr);
			return self::search($searchStr,$arr_table,'stuff_cat');
		}
		catch(exception $e){
			echo 'Error: [cat.class.php/function search_list]'.$e->getMessage().'<br>';
			die();
		}
	}

	public function stuffCatEdit($var){
		try{
			if(!self::perm('stuff_cat','edit'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('stuff_cat',$var['data']['id']);
			$sql = "UPDATE stuff_cat SET name = '{$var['data']['name']}', detail = '{$var['data']['detail']}' WHERE id = '{$var['data']['id']}';";
			self::$PDO->query($sql);

			self::record('stuff_cat','edit','',$var['data']['id'],['old'=>$oldData,'new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: stuff.class > stuffCatEdit :: '.$e->getMessage();
		}
	}

	public function stuffCatDelete($var){
		try{
			if(!self::perm('stuff_cat','delete'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('stuff_cat',$var['id']);
			$sql = "DELETE FROM stuff_cat WHERE id = '{$var['id']}';";
			self::$PDO->query($sql);

			self::record('stuff_cat','delete','',$var['id'],['old'=>$oldData]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: stuff.class > stuffCatDelete :: '.$e->getMessage();
		}
	}

	public function stuffCatAdd($var){
		try{
			if(!self::perm('stuff_cat','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$sql = "INSERT INTO stuff_cat(name,detail) VALUES('{$var['data']['name']}','{$var['data']['detail']}')";
			self::$PDO->query($sql);

			$result = self::$PDO->query("SELECT last_insert_rowid() as lastRow;");
			$row = $result->fetch(PDO::FETCH_ASSOC);
			$lastId = $row['lastRow'];

			self::record('stuff_cat','add','',$lastId,['new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: stuff.class > stuffCatAdd :: '.$e->getMessage();
		}
	}



}

$stuffCat = new stuffCat();

// dsh($stuff->catList('food'));
// dsh($stuff->catList());











?>