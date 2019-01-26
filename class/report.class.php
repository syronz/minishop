<?php
require_once 'base.class.php';
class report extends base{
	public function reportList(){
		try{ 

			if(!self::perm('report','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT substr(date,1,10) as date,sum(qty) as totalQty,sum(price* qty) totalSell,sum(profit) as totalProfit FROM stuff_out WHERE 1 group by substr(date,1,10) ORDER BY date desc");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			self::record('report','view','day');
			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: report.class > reportList :: '.$e->getMessage().'<br>';
		}
	}

	public function reportListMonth(){
		try{

			if(!self::perm('report','view'))
				return json_encode(['Result'=>false,'Records'=>'You_Havent_Permission']);

			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT substr(date,1,7) as date,sum(qty) as totalQty,sum(price* qty) totalSell,sum(profit) as totalProfit FROM stuff_out WHERE 1 group by substr(date,1,7) ORDER BY date desc");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			self::record('report','view','month');
			return (json_encode($result));
		}
		catch(PDOException $e){
			echo 'Error: report.class > reportListMonth :: '.$e->getMessage().'<br>';
		}
	}

	public function reportProduct($v){
		try{
			$result = ['Result'=>'OK'];
			$r = self::$PDO->query("SELECT substr(so.date,1,10) as date,sum(so.qty) as totalQty,sum(so.price* so.qty) totalSell,sum(so.profit) as totalProfit,s.name FROM stuff_out so inner join stuff s on s.id = so.id_stuff WHERE date like '{$v['date']}%' GROUP BY id_stuff ");
			$result['Records'] = $r->fetchAll(PDO::FETCH_ASSOC);

			if(!$result['Records'])
				return json_encode(['Result'=>false,'Records'=>'Your_Information_Not_Exist']);

			return (json_encode($result));
		}
		catch(PDOException $e){
			dsh($e);
		}
	}

}

$report = new report();












?>