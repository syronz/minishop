<?php
session_start();
ini_set('display_errors', 'On');

require_once __DIR__.'/class/base.class.php';
require_once __DIR__.'/class/stuffCat.class.php';
require_once __DIR__.'/class/user.class.php';
require_once __DIR__.'/class/stuff.class.php';
require_once __DIR__.'/class/invoice.class.php';
require_once __DIR__.'/class/perm.class.php';
require_once __DIR__.'/class/report.class.php';

switch (@$_GET['action']) {
	

	//----------------------------------------------------- stuffCat
	case 'stuffCatList':
	echo $stuffCat->stuffCatList(@$_GET['searchStr']);
	break;

	case 'stuffCatEdit':
	echo $stuffCat->stuffCatEdit(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'stuffCatDelete':
	echo $stuffCat->stuffCatDelete(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'stuffCatAdd':
	echo $stuffCat->stuffCatAdd(json_decode(file_get_contents("php://input"),TRUE));
	break;

	//----------------------------------------------------- user 
	case 'login':
	echo $user->login(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'checkLogin':
	echo json_encode($_SESSION?['Result'=>true,'data'=>$_SESSION]:['Result'=>false]);
	break;

	case 'logout':
	$_SESSION = [];
	break;

	//----------------------------------------------------- stuff 
	case 'stuffList':
	echo $stuff->stuffList(@$_GET['searchStr']);
	break;

	case 'stuffEdit':
	echo $stuff->stuffEdit(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'stuffDelete':
	echo $stuff->stuffDelete(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'stuffAdd':
	echo $stuff->stuffAdd(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'stuffListByCat':
	echo $stuff->stuffListByCat(@$_GET['idStuffCat']);
	break;

	case 'stuffByBarcode':
	echo $stuff->stuffByBarcode(@$_GET['barcodeStr']);
	break;

	//----------------------------------------------------- user 
	case 'userList':
	echo $user->dataList(@$_GET['searchStr']);
	break;

	case 'userEdit':
	echo $user->edit(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'userDelete':
	echo $user->delete(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'userAdd':
	echo $user->add(json_decode(file_get_contents("php://input"),TRUE));
	break;


	//----------------------------------------------------- perm 
	case 'permList':
	echo $perm->permList(@$_GET['searchStr']);
	break;

	case 'permEdit':
	echo $perm->permEdit(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'permDelete':
	echo $perm->permDelete(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'permAdd':
	echo $perm->stuffAdd(json_decode(file_get_contents("php://input"),TRUE));
	break;

//----------------------------------------------------- invoice 
	case 'invoiceList':
	echo $invoice->invoiceList(@$_GET['searchStr']);
	break;

	case 'invoiceEdit':
	echo $invoice->invoiceEdit(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'invoiceDelete':
	echo $invoice->invoiceDelete(json_decode(file_get_contents("php://input"),TRUE));
	break;

	case 'invoiceAdd':
	// dsh(file_get_contents("php://input"));
	echo $invoice->invoiceAdd(json_decode(file_get_contents("php://input"),TRUE));
	break;

	//----------------------------------------------------- report 
	case 'reportList':
	echo $report->reportList();
	break;

	case 'reportListMonth':
	echo $report->reportListMonth();
	break;

	case 'reportProduct':
	echo $report->reportProduct($_GET);
	break;





	
	default:
		# code...
	break;
}

// dsh($db->login('a','a'));













?>