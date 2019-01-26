diakoApp.controller('userController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http,$filter,ngTableParams) {

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


	$scope.loginInfo = {username:'',password:''};
	$scope.doLogin = function(){
		$http.post("control.php?action=login",$scope.loginInfo)
		.then(function(response){
			if(response.data.Result){
				$rootScope.langSelected = response.data.data.lang;
				if($rootScope.langSelected == 'ku')
					$rootScope.tr = 'rtl';
				else
					$rootScope.tr = 'ltr';
				$location.path("/");

			}
		});
	}

	$scope.doLogout = function(){
		$http.get("control.php?action=logout")
		.then(function(response){
			console.log(response);
		});
	}

	var lang = $rootScope.langSelected;
	// lang = 'ku';
	$scope.wPermission = dic.w.permission[lang];
	$scope.wLanguage = dic.w.language[lang];
	$scope.wPassword = dic.w.password[lang];
	$scope.wUsername = dic.w.username[lang];
	$scope.wDetail = dic.w.detail[lang];
	$scope.wName = dic.w.name[lang];
	$scope.wID = dic.w.id[lang];
	$scope.wActions = dic.w.actions[lang];

	$scope.elementAdding = {perm:'',name:'',username:'',password:'',lang2:'',detail:''};
	$scope.warning = false;
	$scope.permList = [];

	$http.get("control.php?action=permList").
	success(function(result, status, headers, config) {
		$scope.permList = result.Records;
	}).
	error(function(data, status, headers, config) {
		$log.info(data);
	});


	$scope.list = function(){
		$rootScope.searchHistory = $routeParams.search;
		if(!$routeParams.search)
			$rootScope.searchHistory = 0;
		$http.get("control.php?action=userList&searchStr="+$rootScope.searchHistory).
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

	$scope.saveAdd = function(){
		$log.info('adding',$scope.elementAdding);
		$http.post("control.php?action=userAdd",{data:$scope.elementAdding}).
		success(function(data, status, headers, config) {
			$log.info('success',data,$scope.elementAdding);
			if(data.Result){
				$scope.elementAdding.name = '';
				$scope.elementAdding.username = '';
				$scope.elementAdding.password = '';
				$scope.elementAdding.detail = '';
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
		$http.post("control.php?action=userDelete",{id:id}).
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

	$scope.saveEdit = function(user){
		$log.info(user);
		$http.post("control.php?action=userEdit",{data:user}).
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











});