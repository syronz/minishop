diakoApp.controller('homeController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http,$filter,ngTableParams) {

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



	





});