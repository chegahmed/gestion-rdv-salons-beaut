(function () {

    angular.module('meanApp', ['ngRoute','angularUtils.directives.dirPagination','ngFileUpload']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/accueil', {
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
            .when('/adduser', {
                templateUrl: '/AdminLTE/admin/gestionusers/adduser.view.html',
                controller: 'adduserCtrl',
                controllerAs: 'vm'
            })
            ////gestion catégorie////
            .when('/categorie', {
                templateUrl: '/AdminLTE/admin/categorie/categorie.view.html',
                controller: 'categorieCtrl',
                controllerAs: 'up'
            })
            .when('/addcategorie', {
                templateUrl: '/AdminLTE/admin/categorie/addcategorie.view.html',
                controller: 'addcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/editcategorie/:id', {
                templateUrl: '/AdminLTE/admin/categorie/editcategorie.view.html',
                controller: 'editcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/showcategorie/:id', {
                templateUrl: '/AdminLTE/admin/categorie/showcategorie.view.html',
                controller: 'showcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/souscategorie', {
                templateUrl: '/AdminLTE/admin/souscategorie/souscategorie.view.html',
                controller: 'souscategorieCtrl',
                controllerAs: 'vm'
            })
            ////gestion sous catégorie////
            .when('/addsouscategorie', {
                templateUrl: '/AdminLTE/admin/souscategorie/addsouscategorie.view.html',
                controller: 'addsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/showsouscategorie/:id', {
                templateUrl: '/AdminLTE/admin/souscategorie/showsouscategorie.view.html',
                controller: 'showsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/editsouscategorie/:id', {
                templateUrl: '/AdminLTE/admin/souscategorie/editsouscategorie.view.html',
                controller: 'editsouscategorieCtrl',
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
            .when('/service', {
                templateUrl: '/AdminLTE/admin/services/services.view.html',
                controller: 'servicesCtrl',
                controllerAs: 'vm'
            })
            .when('/editservice/:id', {
                templateUrl: '/AdminLTE/admin/services/editservice.view.html',
                controller: 'editserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/addservice', {
                templateUrl: '/AdminLTE/admin/services/addservice.view.html',
                controller: 'addserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/showservice/:id', {
                templateUrl: '/AdminLTE/admin/services/showservice.view.html',
                controller: 'showserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/profileuser', {
                templateUrl: '/utilisateur/user.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/header', {
                templateUrl: '/AdminLTE/admin/header.html',  //home/home.view.html
                controller: 'headerAdminCtrl',
                controllerAs: 'vm',

            })
            ////////////////////////////////////////here start for salone///////////////////////////////////
            .when('/sallon', {
                templateUrl: '/AdminLTE/salon/rondezvous/index.view.html',
                controller: 'rdvsalonCtrl',
                controllerAs: 'vm'
            })
            /////gestion salon/////
            .when('/salon', {
                templateUrl: '/AdminLTE/salon/gestionsalon/salon.view.html',  //home/home.view.html
                controller: 'salonCtrl',
                controllerAs: 'vm',

            })
            .when('/addsalon', {
                templateUrl: '/AdminLTE/salon/gestionsalon/addsalon.view.html',
                controller: 'addsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/editsalon/:id', {
                templateUrl: '/AdminLTE/salon/gestionsalon/editsalon.view.html',
                controller: 'editsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/showsalon/:id', {
                templateUrl: '/AdminLTE/salon/gestionsalon/showsalon.view.html',
                controller: 'showsalonCtrl',
                controllerAs: 'vm'
            })



            ////////////////////////////////////////here End for salone/////////////////////////////////////
            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }


    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
            if ($location.path() != '/register'&& !authentication.isLoggedIn()) {
                $location.path('/');
            }
        });
    }

    angular
        .module('meanApp')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'authentication', run]);

})();