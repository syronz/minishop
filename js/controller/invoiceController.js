diakoApp.controller('invoiceController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http,$filter,ngTableParams,focus) {

	(function(){
		$http.get("control.php?action=checkLogin")
		.then(function(response){
			// $log.info(response)
			if(!response.data.Result)
				$location.path("login");
			else{
				$rootScope.langSelected = response.data.data.lang;
				if($rootScope.langSelected == 'ku')
					$rootScope.tr = 'rtl';
				else
					$rootScope.tr = 'ltr';
			}
		});
	}());



	var lang = $rootScope.langSelected;
	$scope.wDate = dic.w.date[lang];
	$scope.wPhone = dic.w.phone[lang];
	$scope.wDetail = dic.w.detail[lang];
	$scope.wName = dic.w.name[lang];
	$scope.wID = dic.w.id[lang];
	$scope.wActions = dic.w.actions[lang];
	$scope.wCustomer = dic.w.customer[lang];

	// $scope.elAdd = {perm:'',name:'',username:'',password:'',lang2:'',detail:''};
	$scope.warning = false;
	$scope.stuffCatList = [];
	$scope.stuffList = [];

	$http.get("control.php?action=stuffCatList").
	success(function(result, status, headers, config) {
		$scope.stuffCatList = result.Records;
	}).
	error(function(data, status, headers, config) {
		$log.info(data);
	});

	// $log.info('stuffCatList',$scope.stuffCatList);



	$scope.loadStuff = function(no){
		if(!$scope.stuffList[no])
			$http.get("control.php?action=stuffListByCat&idStuffCat="+no).
		success(function(result, status, headers, config) {
			$scope.stuffList[no] = result.Records;
		}).
		error(function(data, status, headers, config) {
			$log.info(data);
		});
	}


	$scope.loadPrice = function(item){
		// console.log('price',stuff,angular.fromJson(stuff));
		item.stuff2 = angular.fromJson(item.stuff);
		item.cost = parseInt(item.stuff2.price);
		item.barcode = item.stuff2.barcode;
	}

	$scope.list = function(){
		$rootScope.searchHistory = $routeParams.search;
		if(!$routeParams.search)
			$rootScope.searchHistory = 0;
		$http.get("control.php?action=invoiceList&searchStr="+$rootScope.searchHistory).
		success(function(result, status, headers, config) {
			// $log.info(result);
			data = result.Records;
			if(result.Result)
				$scope.tableParams = new ngTableParams({
					page: 1,            
					count: 10,        
					sorting: {
						date: 'desc'    
					}
				}, {
					total: data.length,
					getData: function($defer, params) {
						var orderedData = params.sorting() ?
						$filter('orderBy')(data, params.orderBy()) :
						data;

						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
					}
				});
			else
				$scope.warning = data;
		}).
		error(function(data, status, headers, config) {
			$log.info(data);
		});
	}

	$scope.doPrint = function(){
		var printDivCSS = new String ('<link href="css/printStyle.css" rel="stylesheet"><style>.noPrint{display:none;} tr td:last-child,tr th:last-child{display:none;}</style>');
		// var styles = '<style> td{text-decoration:none;} </style>+'<link href="css/printStyle.css" rel="stylesheet">'';
		window.frames["print_frame"].document.body.innerHTML=printDivCSS + document.getElementById("printThis").innerHTML;
		window.frames["print_frame"].window.focus();
		window.frames["print_frame"].window.print();
	}

	$scope.saveAdd = function(){
		// $log.info('saveAdd',$scope.invoice);
		var tmpData = $scope.invoice;
		$scope.invoice = {};
		console.log(tmpData);
		$http.post("control.php?action=invoiceAdd",{data:tmpData}).
		success(function(data, status, headers, config) {
			$log.info('success',data,$scope.elementAdding);
			if(data.Result){
				$scope.invoice.items = [{qty:1,cost:0}];
				$scope.invoice.customer_info = [];
				$scope.tableParams.sorting({date:'asc'})
				$scope.list();

			}
			else{
				alert(data.Records);
			}
		}).
		error(function(data, status, headers, config) {
			$log.info('error',data, status, headers, config);
		});
	}

	$scope.delete = function(id){
		$http.post("control.php?action=invoiceDelete",{id:id}).
		success(function(data, status, headers, config) {
			$log.info(data);
			if(!data.Result){
				alert(data.Records);
			}
		}).
		error(function(data, status, headers, config) {
			$log.info(data, status, headers, config);
		});
	}





//----------------------------------extra
var sample_invoice = {
	tax: 0, 
	customer_info:  {name: "", phone: "", detail: ""},
	items:[ {qty:1,cost:0}]};

	$scope.invoice = sample_invoice;
	$scope.addItem = function() {
		$scope.invoice.items.push({qty:1, cost:0});    
	}
	$scope.removeItem = function(item) {
		$scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);    
	}

	$scope.invoice_sub_total = function() {
		// console.log('items',$scope.invoice.items);
		var total = 0.00;
		angular.forEach($scope.invoice.items, function(item, key){
			total += (item.qty * item.cost);
		});
		return total;
	}
	$scope.calculate_tax = function() {
		return (($scope.invoice.tax * $scope.invoice_sub_total())/100);
	}
	$scope.calculate_grand_total = function() {
		// localStorage["invoice"] = JSON.stringify($scope.invoice);
		$scope.invoice.grandTotal = $scope.calculate_tax() + $scope.invoice_sub_total();
		return $scope.invoice.grandTotal;
	} 


	$scope.doFocus = function() {
		focus('email');
	}

	$scope.barcodeChange = function(e,item){
		if(e.keyCode == 13){
			// console.log('itemBarcode',item);
			if(item.barcode){
				$http.get("control.php?action=stuffByBarcode&barcodeStr="+item.barcode).
				success(function(result, status, headers, config) {
					// console.log('barcodeChange',result.Records);
					item.stuff2 = result.Records;
					item.cost = parseInt(item.stuff2.price);
					item.stuffCat = parseInt(item.stuff2.id_stuff_cat);
					// $scope.loadStuff(item.stuffCat);
					// item.stuff = angular.toJson(item.stuff2.id);
					
				}).
				error(function(data, status, headers, config) {
					$log.info(data);
				});
				$scope.addItem();
				$scope.doFocus();
			}
			else
				$scope.saveAdd();
		}
	}














});

diakoApp.factory('focus', function($timeout, $window) {
	return function(id) {
		$timeout(function() {
			var nodes = document.querySelectorAll(".barcodeStr");
			var element = nodes[nodes.length - 1];
			if(element)
				element.focus();
		});
	};
});

	// function runScript(e) {
 //    	console.log('barcode',e.keyCode);
 //    	if (e.keyCode == 13) {
 //    		var tb = document.getElementById("scriptBox");
 //    		eval(tb.value);
 //    		return false;
 //    	}
 //    }