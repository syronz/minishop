	// create the module and name it diakoApp
	var diakoApp = angular.module('diakoApp', ['ngRoute','angularFileUpload','ngTable']);

	// configure our routes
	diakoApp.config(function($routeProvider) {
		$routeProvider
		
		.when('/about', {
			templateUrl : 'pages/about.html',
			controller  : 'mainController'
		})
		
		.when('/admin/list/:size/:page/:sort', {
			templateUrl : 'pages/adminList.php',
			controller  : 'adminController'
		})
		.when('/admin/list', {
			templateUrl : 'pages/adminList.php',
			controller  : 'adminController'
		})
		.when('/admin', {
			templateUrl : 'pages/admin.php',
			controller  : 'adminController'
		})
		.when('/admin/add', {
			templateUrl : 'pages/adminAdd.php',
			controller  : 'adminController'
		})
		.when('/admin/edit/:id', {
			templateUrl : 'pages/adminEdit.php',
			controller  : 'adminController'
		})
		.when('/property/:quarter/:type/:propertyType/:maxPrice/:minBedroom/:maxBedroom/:pageSize/:page/:order/:term', {
			templateUrl : 'pages/property.php',
			controller  : 'mainController'
		})
		.when('/search/:quarter/:type/:propertyType/:maxPrice/:minBedroom/:maxBedroom/:pageSize/:page/:order/:term', {
			templateUrl : 'pages/search.php',
			controller  : 'mainController'
		})
		.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller  : 'contactController'
		})
//--------------------------------------------------------------* shop
		.when('/stuffCategory', {
			templateUrl : 'pages/stuffCategory.html',
			controller  : 'stuffCatController'
		})
		.when('/stuffCategory/:search', {
			templateUrl : 'pages/stuffCategory.html',
			controller  : 'stuffCatController'
		})
		.when('/login', {
			templateUrl : 'pages/login.php',
			controller  : 'userController'
		})
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'homeController'		
		})
		.when('/stuff', {
			templateUrl : 'pages/stuff.html',
			controller  : 'stuffController'
		})
		.when('/stuff/:search', {
			templateUrl : 'pages/stuff.html',
			controller  : 'stuffController'
		})
		.when('/user', {
			templateUrl : 'pages/user.html',
			controller  : 'userController'
		})
		.when('/user/:search', {
			templateUrl : 'pages/user.html',
			controller  : 'userController'
		})
		.when('/invoice', {
			templateUrl : 'pages/invoice.html',
			controller  : 'invoiceController'
		})
		.when('/report', {
			templateUrl : 'pages/report.html',
			controller  : 'reportController'
		})
		.when('/reportMonth', {
			templateUrl : 'pages/reportMonth.html',
			controller  : 'reportController'
		})
		.when('/reportProduct', {
			templateUrl : 'pages/reportProduct.html',
			controller  : 'reportController'
		})


		;
	});

	// create the controller and inject Angular's $scope
	
	

	diakoApp.controller('aboutController', function($scope,dic) {
		$scope.message = 'Created By Diako. 7505149171';
	});


	diakoApp.controller('adminController', function($scope,$rootScope,dic,$routeParams,$location,$log,$http,FileUploader) {
        $scope.l = function(word){
        	return dic.w[word][$rootScope.langSelected];

        };

        $scope.setLang = function(language){
        	$rootScope.langSelected = language;
        };
		//--------------------------------------------------end addAdmin

		//--------------------------------------------------start listAdmin

		$scope.getHomes = function(){
			$http.get("control.php?action=homeList").
        	success(function(data, status, headers, config) {
        		$scope.homeList = data.data;
        	}).
        	error(function(data, status, headers, config) {
        	});
		}

		$scope.test = function(){
			$scope.getHomes();
		}

		// $scope.test();

		$scope.deleteProperty = function(id){
			$http.get("control.php?action=deleteProperty&id="+id).
        	success(function(data, status, headers, config) {
        		$log.info(data);
        		$scope.getHomes();
        	}).
        	error(function(data, status, headers, config) {
        		// $log.info(data);
        	});
		}
		//--------------------------------------------------end listAdmin

		//--------------------------------------------------start editAdmin
		$scope.getInfoEdit = function(id){
			$http.get("control.php?action=getInfoEdit&id="+id).
        	success(function(data, status, headers, config) {
        		$log.info(data);
        		var pI = data.data[0]; //propertyInfo
        		$scope.pI = pI;
        		$scope.quarter = pI.quarter;
				$scope.type = pI.type;
				$scope.property = pI.property_type;
				$scope.priceDollar = pI.price_dollar - 0;
				$scope.area = pI.area - 0;
				$scope.bedroom = pI.bedroom;
				$scope.phone = pI.phone;
				$scope.addressKurdish = pI.address_k;
				$scope.addressEnglish = pI.address_e;
				$scope.addressArabic = pI.address_a;
				$scope.descriptionKurdish = pI.description_k;
				$scope.descriptionEnglish = pI.description_e;
				$scope.descriptionArabic = pI.description_a;
				$scope.hashtag = pI.hashtag;
				$scope.gps = pI.gps;
				$scope.detail = pI.detail;
        	}).
        	error(function(data, status, headers, config) {
        		// $log.info(data);
        	});
		}

		$scope.deleteImage = function(id,name){
			$http.get("control.php?action=deleteImage&id="+id+"&name="+name).
        	success(function(data, status, headers, config) {
        		$log.info(data);
        	}).
        	error(function(data, status, headers, config) {
        		$log.info("error: js/script.js deleteImage",data);
        	});
		}
		//--------------------------------------------------end   editAdmin
	});
	//------------------------------------------------------end adminController

	diakoApp.directive('ngThumb', ['$window', function($window) {
		var helper = {
			support: !!($window.FileReader && $window.CanvasRenderingContext2D),
			isFile: function(item) {
				return angular.isObject(item) && item instanceof $window.File;
			},
			isImage: function(file) {
				var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
				return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
			}
		};

		return {
			restrict: 'A',
			template: '<canvas/>',
			link: function(scope, element, attributes) {
				if (!helper.support) return;

				var params = scope.$eval(attributes.ngThumb);

				if (!helper.isFile(params.file)) return;
				if (!helper.isImage(params.file)) return;

				var canvas = element.find('canvas');
				var reader = new FileReader();

				reader.onload = onLoadFile;
				reader.readAsDataURL(params.file);

				function onLoadFile(event) {
					var img = new Image();
					img.onload = onLoadImage;
					img.src = event.target.result;
				}

				function onLoadImage() {
					var width = params.width || this.width / this.height * params.height;
					var height = params.height || this.height / this.width * params.width;
					canvas.attr({ width: width, height: height });
					canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
				}
			}
		};
	}]);

