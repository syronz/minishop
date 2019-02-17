<?php
require_once 'base.class.php';
class stuff extends base{
	public function stuffList($searchStr = null){
		try{ 
			if($searchStr)
				return self::searchCat($searchStr);

			if(!self::perm('stuff','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT substr('00000' || s.id,-5) as id,s.barcode,s.name,s.price_buy,s.price,s.qty,'1' as stuffCat from stuff s ");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			self::record('stuff','view','');
			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: [stuff.class.php/function stuffList]'.$e->getMessage().'<br>';
		}
	}

	public static function searchCat($searchStr){
		try{
			if(!self::perm('stuff','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$arr_table = array(
				'id'=>array('state'=>'self','field'=>'id'),
				'name'=>array('state'=>'self','field'=>'name'),
				'detail'=>array('state'=>'self','field'=>'detail'),
				'qty'=>array('state'=>'self','field'=>'qty'),
				'barcode'=>array('state'=>'self','field'=>'barcode'),
				'price'=>array('state'=>'self','field'=>'price'),
				'stuffCat'=>array('state'=>'foreign','table'=>'stuff_cat','field'=>'name','source'=>'id_stuff_cat'),
				);
			
			self::record('stuff','search',$searchStr);
			return self::search($searchStr,$arr_table,'stuff');
		}
		catch(exception $e){
			echo 'Error: [cat.class.php/function search_list]'.$e->getMessage().'<br>';
			die();
		}
	}

	public function stuffEdit($var){
		try{
			$var['data']['id_stuff_cat'] = 1;
			$var['data']['detail'] = '';
			if(!self::perm('stuff','edit'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('stuff',$var['data']['id']);
			$sql = "UPDATE stuff SET name = '{$var['data']['name']}', barcode = '{$var['data']['barcode']}',qty = '{$var['data']['qty']}',price = '{$var['data']['price']}',price_buy = '{$var['data']['price_buy']}' WHERE id = '{$var['data']['id']}';";
			self::$PDO->query($sql);

			self::record('stuff','edit','',$var['data']['id'],['old'=>$oldData,'new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: stuff.class > stuffEdit :: '.$e->getMessage();
		}
	}

	public function stuffDelete($var){
		try{
			if(!self::perm('stuff','delete'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('stuff',$var['id']);
			$sql = "DELETE FROM stuff WHERE id = '{$var['id']}';";
			self::$PDO->query($sql);

			self::record('stuff','delete','',$var['id'],['old'=>$oldData]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: stuff.class > stuffDelete :: '.$e->getMessage();
		}
	}

	public function stuffAdd($var){
		try{
			if(!self::perm('stuff','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$sql = "INSERT INTO stuff(name,detail,id_stuff_cat,barcode,qty,price,price_buy) VALUES('{$var['data']['name']}','{$var['data']['detail']}','1','{$var['data']['barcode']}','{$var['data']['qty']}','{$var['data']['price']}','{$var['data']['price_buy']}')";
			self::$PDO->query($sql);

			$result = self::$PDO->query("SELECT last_insert_rowid() as lastRow;");
			$row = $result->fetch(PDO::FETCH_ASSOC);
			$lastId = $row['lastRow'];

			self::record('stuff','add','',$lastId,['new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: stuff.class > stuffAdd :: '.$e->getMessage();
		}
	}

	
	public function stuffListByCat($idCat){
		try{
			if(!self::perm('invoice','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT * from stuff WHERE id_stuff_cat = '$idCat' ORDER BY name");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: stuff.class > stuffListByCat'.$e->getMessage().'<br>';
		}
	}

	public function stuffByBarcode($barcode){
		try{
			if(!self::perm('invoice','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);
			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT * from stuff WHERE barcode = '$barcode' LIMIT 1");
			$result['Records'] = $r->fetch(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: stuff.class > stuffByBarcode'.$e->getMessage().'<br>';
		}
	}

	public function stuffToInvoice($idStuff,$idInvoice,$qty,$date,$price){
		try{
			if(!self::perm('stuff_out','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = self::$PDO->query("SELECT price_buy from stuff WHERE id = '$idStuff'");
			$price_buy = $result->fetch(PDO::FETCH_ASSOC)['price_buy'];
			$profit = (floatval($price) - floatval($price_buy)) * intval($qty);

			$var['data'] = ['id_stuff'=>$idStuff,'id_invoice'=>$idInvoice,'qty'=>$qty,'date'=>$date,'price'=>$price];

			self::$PDO->query("UPDATE stuff SET qty = qty - '$qty' WHERE id = '$idStuff'");
			self::$PDO->query("INSERT INTO stuff_out(id_stuff,id_invoice,type,qty,date,price,profit) VALUES('$idStuff','$idInvoice','invoice','$qty','$date','$price','$profit')");

			$result = self::$PDO->query("SELECT last_insert_rowid() as lastRow;");
			$row = $result->fetch(PDO::FETCH_ASSOC);
			$lastId = $row['lastRow'];

			self::record('stuff_out','add','',$lastId,['new'=>$var['data']]);
			return true;
		}
		catch(PDOException $e){
			echo 'Error: stuff.class > stuffToInvoice'.$e->getMessage().'<br>';
		}
	}

	public function stuffOutDelete($idInvoice){
		try{
			if(!self::perm('invoice','delete'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			

			$r = self::$PDO->query("SELECT * FROM stuff_out WHERE id_invoice = '$idInvoice'");
			$rows = $r->fetchAll(PDO::FETCH_ASSOC);

			foreach ($rows as $k => $v) {
				self::$PDO->query("UPDATE stuff SET qty = qty + '{$v['qty']}' WHERE id = '{$v['id_stuff']}'");
				self::$PDO->query("DELETE FROM stuff_out WHERE id = '{$v['id']}'");

				self::record('stuff_out','delete','',$v['id'],['old'=>$v]);
			}

			

			
			return true;
		}
		catch(PDOException $e){
			echo 'Error: stuff.class > stuffOutDelete'.$e->getMessage().'<br>';
		}
	}

}

$stuff = new stuff();

// dsh($stuff->catList('food'));
// dsh($stuff->catList());











?>
