diakoApp.controller('reportController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http,$filter,ngTableParams) {

	(function(){
		$http.get("control.php?action=checkLogin")
		.then(function(response){
			$log.info(response)
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
	$scope.wTotalQty = dic.w.totalQty[lang];
	$scope.wTotalSell = dic.w.totalSell[lang];
	$scope.wID = dic.w.id[lang];
	$scope.wActions = dic.w.actions[lang];
	$scope.warning = false;
	$scope.wTotalProfit = 'قازانج';
	$scope.wProduct = 'بەرهەم';


	$scope.list = function(){
		$http.get("control.php?action=reportList").
		success(function(result, status, headers, config) {
			$log.info(result);
			data = result.Records;
			if(result.Result)
				$scope.tableParams = new ngTableParams({
					page: 1,            
					count: 10,        
					sorting: {
						name: 'asc'    
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

	$scope.listMonth = function(){
		$http.get("control.php?action=reportListMonth").
		success(function(result, status, headers, config) {
			$log.info(result);
			data = result.Records;
			if(result.Result)
				$scope.tableParams = new ngTableParams({
					page: 1,            
					count: 10,        
					sorting: {
						name: 'asc'    
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

	$scope.prDate = $filter('date')(new Date, 'y-MM-dd');
	$scope.prShowReport = function(){
		$scope.tableParams.sorting({name:'asc'});
		$http.get("control.php?action=reportProduct&date="+$filter('date')($scope.prDate, 'y-MM-dd')).
		success(function(result, status, headers, config) {
			$log.info(result);
			data = result.Records;
			if(result.Result)
				$scope.tableParams = new ngTableParams({
					page: 1,            
					count: 10,        
					sorting: {
						profit: 'desc'    
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
				console.log(data);
		}).
		error(function(data, status, headers, config) {
			$log.info(data);
		});
	}


});