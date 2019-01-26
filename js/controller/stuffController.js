diakoApp.controller('stuffController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http,$filter,ngTableParams) {

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

	$scope.stuffAdding = {cat:'',name:'',barcode:'',qty:'',price:'',detail:''};
	$scope.warning = false;
	$scope.catList = [];

	$http.get("control.php?action=stuffCatList").
	success(function(result, status, headers, config) {
		$scope.catList = result.Records;
	}).
	error(function(data, status, headers, config) {
		$log.info(data);
	});

	$scope.list = function(){
		$rootScope.searchHistory = $routeParams.search;
		if(!$routeParams.search)
			$rootScope.searchHistory = 0;
		$http.get("control.php?action=stuffList&searchStr="+$rootScope.searchHistory).
		success(function(result, status, headers, config) {
			$log.info(result);
			data = result.Records;
			if(result.Result)
				$scope.tableParams = new ngTableParams({
					page: 1,            
					count: 10,        
					sorting: {
						id: 'desc'    
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

	$scope.saveEdit = function(stuff){
		$http.post("http://localhost/shop/control.php?action=stuffEdit",{data:stuff}).
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

	$scope.delete = function(id){
		if(!confirm('ئایا دلةیای لە سرینەوەی ئەم بەرهەمە؟')){
			return false;
		}

		$http.post("http://localhost/shop/control.php?action=stuffDelete",{id:id}).
		success(function(data, status, headers, config) {
			$log.info(data);
			if(!data.Result){
				alert(data.Records);
			}
		}).
		error(function(data, status, headers, config) {
			$log.info(data, status, headers, config);
		});

		return true;
	}

	$scope.saveAdd = function(){
		// $log.info('adding',$scope.stuffAdding);
		$http.post("http://localhost/shop/control.php?action=stuffAdd",{data:$scope.stuffAdding}).
		success(function(data, status, headers, config) {
			$log.info('success',data,$scope.stuffAdding);
			if(data.Result){
				$scope.stuffAdding.name = '';
				$scope.stuffAdding.detail = '';
				$scope.stuffAdding.barcode = '';
				$scope.stuffAdding.qty = '';
				$scope.stuffAdding.price = '';
				$scope.stuffAdding.price_buy = '';
			}
			else{
				alert(data.Records);
			}
		}).
		error(function(data, status, headers, config) {
			$log.info('error',data, status, headers, config);
		});
	}


	$scope.route = $routeParams;









});