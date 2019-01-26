<?php
require_once 'base.class.php';
class perm extends base{
	public function permList($searchStr = null){
		try{ 
			if($searchStr)
				return self::searchCat($searchStr);

			if(!self::perm('perm','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT * from perm ORDER BY name");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			self::record('perm','view','');
			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: [perm.class.php/function permList]'.$e->getMessage().'<br>';
		}
	}

	// public static function search($searchStr){
	// 	try{
	// 		if(!self::perm('perm','view'))
	// 			return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

	// 		$arr_table = array(
	// 			'id'=>array('state'=>'self','field'=>'id'),
	// 			'name'=>array('state'=>'self','field'=>'name'),
	// 			'detail'=>array('state'=>'self','field'=>'detail'),
	// 			'qty'=>array('state'=>'self','field'=>'qty'),
	// 			'barcode'=>array('state'=>'self','field'=>'barcode'),
	// 			'price'=>array('state'=>'self','field'=>'price'),
	// 			'permCat'=>array('state'=>'foreign','table'=>'perm_cat','field'=>'name','source'=>'id_perm_cat'),
	// 			);
			
	// 		self::record('perm','search',$searchStr);
	// 		return self::search($searchStr,$arr_table,'perm');
	// 	}
	// 	catch(exception $e){
	// 		echo 'Error: [cat.class.php/function search]'.$e->getMessage().'<br>';
	// 		die();
	// 	}
	// }

	public function permEdit($var){
		try{
			if(!self::perm('perm','edit'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('perm',$var['data']['id']);
			$sql = "UPDATE perm SET name = '{$var['data']['name']}', detail = '{$var['data']['detail']}',id_perm_cat = '{$var['data']['id_perm_cat']}',barcode = '{$var['data']['barcode']}',qty = '{$var['data']['qty']}',price = '{$var['data']['price']}' WHERE id = '{$var['data']['id']}';";
			self::$PDO->query($sql);

			self::record('perm','edit','',$var['data']['id'],['old'=>$oldData,'new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: perm.class > permEdit :: '.$e->getMessage();
		}
	}

	public function permDelete($var){
		try{
			if(!self::perm('perm','delete'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('perm',$var['id']);
			$sql = "DELETE FROM perm WHERE id = '{$var['id']}';";
			self::$PDO->query($sql);

			self::record('perm','delete','',$var['id'],['old'=>$oldData]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: perm.class > permDelete :: '.$e->getMessage();
		}
	}

	public function permAdd($var){
		try{
			if(!self::perm('perm','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$sql = "INSERT INTO perm(name,detail,id_perm_cat,barcode,qty,price) VALUES('{$var['data']['name']}','{$var['data']['detail']}','{$var['data']['cat']}','{$var['data']['barcode']}','{$var['data']['qty']}','{$var['data']['price']}')";
			self::$PDO->query($sql);

			$result = self::$PDO->query("SELECT last_insert_rowid() as lastRow;");
			$row = $result->fetch(PDO::FETCH_ASSOC);
			$lastId = $row['lastRow'];

			self::record('perm','add','',$lastId,['new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: perm.class > permAdd :: '.$e->getMessage();
		}
	}



}

$perm = new perm();

// dsh($perm->catList('food'));
// dsh($perm->catList());











?>