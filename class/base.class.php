<?php
if(!isset($_SESSION)){
	session_start();
}
require_once 'search.class.php';
require_once 'user.class.php';
ini_set('display_errors', 'On');
ini_set('max_execution_time', 300000);
date_default_timezone_set("Asia/Baghdad");

function dsh(){
	$argList = func_get_args();
	// var_dump($argList);
	foreach($argList as $key => $v){
		echo '<pre style="color:red">';
		ob_start();
		var_dump($v);
		$result = ob_get_clean();
		$result = str_replace(">\n", '>', $result);
		echo $result;
		echo '</pre><hr>';
	}
}
 
class base{
	public static $db; 
	public static $PDO; 
	public static $PDOACTIVITY;
	function __construct(){
		// self::$db = new SQLite3('realestate.db');
		$dbPath = dirname(dirname(__FILE__));
		self::$PDO = new PDO("sqlite:$dbPath/shop.db");
		self::$PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		self::$PDOACTIVITY = new PDO("sqlite:$dbPath/activity.db");
	    self::$PDOACTIVITY->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	}

	public function convertNumber($string) {
		$persian = array('۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹');
		$arabic = array('٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩');

		$num = range(0, 9);
		$string = str_replace($persian, $num, $string);
		return str_replace($arabic, $num, $string);
	}


	public static function search($search_str,$arr_table,$table,$other_table = null){
		try{
			return search::make_search_list('id DESC','0','10000',$search_str,$arr_table,$table,$other_table);
		}
		catch(exception $e){
			echo 'Error: [database.class.php/function search]'.$e->getMessage().'<br>';
			die();
		}
	}


	public static function record($table,$action,$detail,$idtable = null,$data = null){
		try{
			$user = new user();
			$user->recordActivity($table,$action,$detail,$idtable,$data,$_SESSION['id'],$_SERVER['REMOTE_ADDR'],date('Y-m-d H:i:s',time()));
		}
		catch(exception $e){
			echo 'ERROR: base.class > record :: '.$e->getMessage().'<br>';
			die();
		}
	}


	public static function perm($table,$action,$power = null){
		try{
			$user = new user();
			return $user->checkPerm($table,$action,@$_SESSION['id_perm'],$power);
		}
		catch(exception $e){
			echo 'ERROR: base.class > perm :: '.$e->getMessage().'<br>';
			die();
		}
	}

	public static function getRow($table,$id){
		try{
			$sql = "SELECT * FROM $table WHERE id = '$id'";
			$result = self::$PDO->query($sql);
			return $result->fetch(PDO::FETCH_ASSOC);
		}
		catch(exception $e){
			echo 'ERROR: base.class > getRow :: '.$e->getMessage().'<br>';
			die();
		}
	}




}
$db = new base();
?>