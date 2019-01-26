diakoApp.controller('mainController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http) {
	if(!$rootScope.langSelected)
		$rootScope.langSelected = 'ku';
	$rootScope.tr = 'ltr';
	$scope.setLang = function(language){
		$rootScope.langSelected = language;
		$rootScope.tr = 'rtl';
		if(language == 'en'){
			$rootScope.tr = 'ltr';
		}
	};

	(function(){
		$http.get("control.php?action=checkLogin")
		.then(function(response){
			// $log.info(response)
			if(!response.data)
				$location.path("login");
		});
	}());


	

	$scope.$on("$routeChangeSuccess",function handleRouteChangeEvent( event ) {
		$scope.l = function(word){
			return dic.w[word][$rootScope.langSelected];
		};
	});

	$scope.doLogin = function(){
		$http.get("control.php?action=login&username="+$scope.inputUsername+"&password="+$scope.inputPassword)
		.then(function(response){
				// return response.data;
				$log.info(response.data);
				if(response.data.result)
					$location.path("/admin");
			});
	}

	$scope.searchProperty = function(){
		$log.info($scope.quarter,$scope.type,$scope.propertyType,$scope.maxPrice,$scope.minBedroom,$scope.maxBedroom);
		$location.path("/search/"+$scope.quarter+"/"+$scope.type+"/"+$scope.propertyType+"/"+$scope.maxPrice+"/"+$scope.minBedroom+"/"+$scope.maxBedroom+"/25/1/date/desc");

	}

	$scope.isHome =function(e){
		if(e == 'house')
			return true;
		return false;
	}

	$scope.pagination = function(count){
		var r = $routeParams;
		var link0 = '#property/'+r.quarter+'/'+r.type+'/'+r.propertyType+'/'+r.maxPrice+'/'+r.minBedroom+'/'+r.maxBedroom+'/'+r.pageSize+'/';
		var link1 = '#search/'+r.quarter+'/'+r.type+'/'+r.propertyType+'/'+r.maxPrice+'/'+r.minBedroom+'/'+r.maxBedroom+'/'+r.pageSize+'/';
		var currentPage = parseInt(r.page);
		var link2 = '/'+r.order+'/'+r.term;

		n = {};
		n.pre = {link:link1 + (currentPage - 1) + link2, val:(currentPage - 1), linkProperty:link0 + (currentPage - 1) + link2};
		n.one = {link:link1 + (currentPage - 2) + link2, val:(currentPage - 2)};
		n.two = {link:link1 + (currentPage - 1) + link2, val:(currentPage - 1)};
		n.three = {link:link1 + (currentPage) + link2, val:(currentPage)};
		n.four = {link:link1 + (currentPage + 1) + link2, val:(currentPage + 1)};
		n.five = {link:link1 + (currentPage + 2) + link2, val:(currentPage + 2)};
		n.next = {link:link1 + (currentPage + 1) + link2, val:(currentPage + 1), linkProperty:link0 + (currentPage + 1) + link2};
		n.search = '#search/'+r.quarter+'/'+r.type+'/'+r.propertyType+'/'+r.maxPrice+'/'+r.minBedroom+'/'+r.maxBedroom+'/25/'+currentPage+link2;
		return n

	}

	$scope.orderUpdate = function(){
		$log.info($scope.orderState);
		var r = $routeParams;
		var link = 'search/'+r.quarter+'/'+r.type+'/'+r.propertyType+'/'+r.maxPrice+'/'+r.minBedroom+'/'+r.maxBedroom+'/'+r.pageSize+'/1/';
		switch($scope.orderState) {
			case 'DateRecent':
			$location.path(link+"date/desc");
			break;
			case 'DateOldest':
			$location.path(link+"date/asc");
			break;
			case 'PriceHighest':
			$location.path(link+"price_dollar/desc");
			break;
			case 'PriceLowest':
			$location.path(link+"price_dollar/asc");
			break;

			default:
			$location.path(link+"date/desc");
		}
	}


	$scope.propertyList = function(){
		$http.get("control.php?action=propertyList&quarter="+$routeParams.quarter+"&type="+$routeParams.type+"&propertyType="+$routeParams.propertyType+"&maxPrice="+$routeParams.maxPrice+"&minBedroom="+$routeParams.minBedroom+"&maxBedroom="+$routeParams.maxBedroom+"&pageSize="+$routeParams.pageSize+"&page="+$routeParams.page+"&order="+$routeParams.order+"&term="+$routeParams.term).
		success(function(data, status, headers, config) {
			$scope.filterResult = data.data;
			$scope.count = data.count;
			$scope.pagi = $scope.pagination(data.count);
			if($routeParams.order == 'date')
				if($routeParams.term == 'desc')
					$scope.orderState = 'DateRecent';
				else
					$scope.orderState = 'DateOldest';
				else
					if($routeParams.term == 'desc')
						$scope.orderState = 'PriceHighest';
					else
						$scope.orderState = 'PriceLowest';
					$log.info(data);
				}).
		error(function(data, status, headers, config) {
			$log.info(data);
		});
	}

	$scope.newProperty = function(){
		$http.get("control.php?action=propertyList&quarter=all&pageSize=1&page=1&order=date&term=desc").
		success(function(data, status, headers, config) {
			$scope.filterResult = data.data[0];
			$log.info(data);
		}).
		error(function(data, status, headers, config) {
			$log.info(data);
		});
	}

	$scope.route = $routeParams;

	$scope.doSearch = function(){
		if($scope.searchStr)
			$location.path($location.path().split('/')[1] + '/' + $scope.searchStr);
		else
			$location.path($location.path().split('/')[1]);
	}


	
});

diakoApp.filter('noFractionCurrency',
    [ '$filter', '$locale', function(filter, locale) {
      var currencyFilter = filter('currency');
      var formats = locale.NUMBER_FORMATS;
      return function(amount, currencySymbol) {
        var value = currencyFilter(amount, currencySymbol);
        var sep = value.indexOf(formats.DECIMAL_SEP);
        if(amount >= 0) { 
          return value.substring(0, sep);
        }
        return value.substring(0, sep) + ')';
      };
    } ]);