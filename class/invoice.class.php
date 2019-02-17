<?php
require_once 'base.class.php';
require_once 'stuff.class.php';
class invoice extends base{
	public function invoiceList($searchStr = null){
		try{
			if($searchStr)
				return self::searchCat($searchStr);

			if(!self::perm('invoice','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT id,name,phone,date,detail from invoice order by date desc");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);
			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			self::record('invoice','view','');
			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: [invoice.class.php/function invoiceList]'.$e->getMessage().'<br>';
		}
	}

	public static function searchCat($searchStr){
		try{
			if(!self::perm('invoice','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$arr_table = array(
				'id'=>array('state'=>'self','field'=>'id'),
				'name'=>array('state'=>'self','field'=>'name'),
				'detail'=>array('state'=>'self','field'=>'detail'),
				'qty'=>array('state'=>'self','field'=>'qty'),
				'barcode'=>array('state'=>'self','field'=>'barcode'),
				'price'=>array('state'=>'self','field'=>'price'),
				'invoiceCat'=>array('state'=>'foreign','table'=>'invoice_cat','field'=>'name','source'=>'id_invoice_cat'),
				);
			
			self::record('invoice','search',$searchStr);
			return self::search($searchStr,$arr_table,'invoice');
		}
		catch(exception $e){
			echo 'Error: [cat.class.php/function search_list]'.$e->getMessage().'<br>';
			die();
		}
	}

	public function invoiceEdit($var){
		try{
			if(!self::perm('invoice','edit'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('invoice',$var['data']['id']);
			$sql = "UPDATE invoice SET name = '{$var['data']['name']}', detail = '{$var['data']['detail']}',id_invoice_cat = '{$var['data']['id_invoice_cat']}',barcode = '{$var['data']['barcode']}',qty = '{$var['data']['qty']}',price = '{$var['data']['price']}' WHERE id = '{$var['data']['id']}';";
			self::$PDO->query($sql);

			self::record('invoice','edit','',$var['data']['id'],['old'=>$oldData,'new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: invoice.class > invoiceEdit :: '.$e->getMessage();
		}
	}

	public function invoiceDelete($var){
		try{
			if(!self::perm('invoice','delete'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$oldData = self::getRow('invoice',$var['id']);
			$sql = "DELETE FROM invoice WHERE id = '{$var['id']}';";
			self::$PDO->query($sql);

			$stuff = new stuff();
			$stuff->stuffOutDelete($var['id']);

			self::record('invoice','delete','',$var['id'],['old'=>$oldData]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: invoice.class > invoiceDelete :: '.$e->getMessage();
		}
	}

	public function invoiceAdd($var){
		try{
			if(!self::perm('invoice','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$var['data']['date'] = date('Y-m-d H:i:s',time());
			$var['data']['id_user'] = $_SESSION['id'];
			$var['data']['name'] = @$var['data']['customer_info']['name'] ?  @$var['data']['customer_info']['name'] : @$var['data']['customerName'];
			$var['data']['phone'] = @$var['data']['customer_info']['phone'] ?  @$var['data']['customer_info']['phone'] : @$var['data']['customerPhone'];
			$var['data']['detail'] = @$var['data']['customer_info']['detail'];
			$var['data']['tax'] = floatval(@$var['data']['discountAmount']);
			unset($var['data']['customer_info']);

			// dsh($var);
			

			$sql = "INSERT INTO invoice(name,phone,date,detail,discount,id_user) VALUES('{$var['data']['name']}','{$var['data']['phone']}','{$var['data']['date']}','{$var['data']['detail']}','{$var['data']['tax']}','{$var['data']['id_user']}')";
			self::$PDO->query($sql);

			$result = self::$PDO->query("SELECT last_insert_rowid() as lastRow;");
			$row = $result->fetch(PDO::FETCH_ASSOC);
			$idInvoice = $row['lastRow'];

			$stuff = new stuff();
			foreach ($var['data']['items'] as $key => $v) {
				if(@$v['stuff2'])
					$stuff->stuffToInvoice($v['stuff2']['id'],$idInvoice,$v['qty'],$var['data']['date'],$v['cost']);
			}
			


			unset($var['data']['items']);
			self::record('invoice','add','',$idInvoice,['new'=>$var['data']]);
			return json_encode(['Result'=>true,'Records'=>'OK']);
		}
		catch(PDOException $e){
			echo 'ERROR: invoice.class > invoiceAdd :: '.$e->getMessage();
		}
	}

	
	public function invoiceListByCat($idCat){
		try{
			if(!self::perm('invoice','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT * from invoice WHERE id_invoice_cat = '$idCat' ORDER BY name");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: invoice.class > invoiceListByCat'.$e->getMessage().'<br>';
		}
	}

	public function invoiceByBarcode($barcode){
		try{
			if(!self::perm('invoice','add'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);
			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT * from invoice WHERE barcode = '$barcode' LIMIT 1");
			$result['Records'] = $r->fetch(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: invoice.class > invoiceByBarcode'.$e->getMessage().'<br>';
		}
	}

}

$invoice = new invoice();

// dsh($invoice->catList('food'));
// dsh($invoice->catList());











?>
