diakoApp.controller('stuffCatController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http,$filter,ngTableParams) {

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
	
	$scope.stuffCatAdding = {name:'',detail:''};
	$scope.warning = false;

	$scope.catList = function(){		
		$rootScope.searchHistory = $routeParams.search;
		if(!$routeParams.search)
			$rootScope.searchHistory = 0;
		$http.get("control.php?action=stuffCatList&searchStr="+$rootScope.searchHistory).
		success(function(result, status, headers, config) {
			// $scope.catList = result.Records;
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

	$scope.saveEdit = function(stuffCat){
		$http.post("http://localhost/shop/control.php?action=stuffCatEdit",{data:stuffCat}).
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
		$http.post("http://localhost/shop/control.php?action=stuffCatDelete",{id:id}).
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

	$scope.saveAdd = function(){
		$log.info('adding',$scope.stuffCatAdding);
		$http.post("http://localhost/shop/control.php?action=stuffCatAdd",{data:$scope.stuffCatAdding}).
		success(function(data, status, headers, config) {
			$log.info(data,$scope.stuffCatAdding);
			if(data.Result){
				$scope.stuffCatAdding.name = '';
				$scope.stuffCatAdding.detail = '';
			}
			else{
				alert(data.Records);
			}
		}).
		error(function(data, status, headers, config) {
			$log.info(data, status, headers, config);
		});
	}


	$scope.route = $routeParams;









});