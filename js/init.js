var app = angular.module('app',['ui.router']);


app.config(['$httpProvider','$stateProvider','$urlRouterProvider',function ($httpProvider, $stateProvider, $urlRouterProvider) {    // [url]http://habrahabr.ru/post/181009/[/url]
	$httpProvider.defaults.headers.post[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=utf-8';
	$httpProvider.defaults.transformRequest = function (data) {
		return angular.isObject(data) && String(data) !== '[object File]' ? angular.toParam(data) : data;
	};
}]);


