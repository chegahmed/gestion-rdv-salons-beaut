(function () {

    angular.module('userApp', ['ngRoute','angularUtils.directives.dirPagination','ngFileUpload']);

    function config($routeProvider, $locationProvider) {
        $routeProvider


            .when('/', {
                templateUrl:'/booking/stepOne/index.view.html',
                controller: 'userCtrl',
                controllerAs: 'vm'
            })
            .when('/rdvlistsalons/:ville', {
                templateUrl:'/booking/stepTow/salons.view.html',
                controller: 'rdvsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/rdvlistservices/:idsalon', {
                templateUrl:'/booking/stepThree/services.view.html',
                controller: 'rdvserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/rdvconfirmer', {
                templateUrl:'/booking/stepFour/confermrdv.view.html',
                controller: 'rdvconfirmCtrl',
                controllerAs: 'vm'
            })

            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }


    function run($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
          /*  if ($location.path() == '/admin') {

                $location.path('/admin');
            }*/
        });
    }

    angular
        .module('userApp')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', run]);

})();