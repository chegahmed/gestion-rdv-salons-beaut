(function () {

    angular.module('meanApp', ['ngRoute']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/AdminLTE/admin/gestionusers/gestionusers.view.html',  //home/home.view.html
                controller: 'gestionusersCtrl',
               controllerAs: 'vm',

            })
            .when('/edituser/:id', {
                templateUrl: '/AdminLTE/admin/gestionusers/edituser.view.html',
                controller: 'edituserCtrl',
                controllerAs: 'vm'
            })
            .when('/showuser/:id', {
                templateUrl: '/AdminLTE/admin/gestionusers/showuser.view.html',
                controller: 'showuserCtrl',
                controllerAs: 'vm'
            })
            .when('/service', {
                templateUrl: '/AdminLTE/admin/services/services.view.html',
                controller: 'servicesCtrl',
                controllerAs: 'vm'
            })
            .when('/addservice', {
                templateUrl: '/AdminLTE/admin/services/addservice.view.html',
                controller: 'addserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/editservice/:id', {
                templateUrl: '/AdminLTE/admin/services/editservice.view.html',
                controller: 'editserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/showservice/:id', {
                templateUrl: '/AdminLTE/admin/services/showservice.view.html',
                controller: 'showserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/ville', {
                templateUrl: '/AdminLTE/admin/ville/ville.view.html',
                controller: 'villeCtrl',
                controllerAs: 'vm'
            })
            .when('/editville/:id', {
                templateUrl: '/AdminLTE/admin/ville/editville.view.html',
                controller: 'editvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/addville', {
                templateUrl: '/AdminLTE/admin/ville/addville.view.html',
                controller: 'addvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/showville/:id', {
                templateUrl: '/AdminLTE/admin/ville/showville.view.html',
                controller: 'showvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl:'/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/profile', {
                templateUrl: 'index.html',
                controller: 'profileCtrl',
                controllerAs: 'vm'
            })
            .when('/profileuser', {
                templateUrl: '/utilisateur/user.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }


    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if ($location.path() === '/profile' && !authentication.isLoggedIn()) {
                $location.path('/');
            }
        });
    }

    angular
        .module('meanApp')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'authentication', run]);

})();