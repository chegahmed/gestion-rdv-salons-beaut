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
                templateUrl: '/AdminLTE/admin/gestionusers/gestionusers.view.html',
                controller: 'gestionusersCtrl',
                controllerAs: 'vm',

            })
            .when('/edituser/:id', {
                templateUrl: '/AdminLTE/admin/gestionusers/edituser.view.html',
                controller: 'edituserCtrl',
                controllerAs: 'vm'
            })
            .when('/showuser/:id', {
                templateUrl: '/AdminLTE/admin/gestionusers/showUser.view.html',
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
                templateUrl: '/AdminLTE/admin/categorie/addCategorie.view.html',
                controller: 'addcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/editcategorie/:id', {
                templateUrl: '/AdminLTE/admin/categorie/editCategorie.view.html',
                controller: 'editcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/showcategorie/:id', {
                templateUrl: '/AdminLTE/admin/categorie/showCategorie.view.html',
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
                templateUrl: '/AdminLTE/admin/souscategorie/addSouscategorie.view.html',
                controller: 'addsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/showsouscategorie/:id', {
                templateUrl: '/AdminLTE/admin/souscategorie/showSouscategorie.view.html',
                controller: 'showsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/editsouscategorie/:id', {
                templateUrl: '/AdminLTE/admin/souscategorie/editSouscategorie.view.html',
                controller: 'editsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/ville', {
                templateUrl: '/AdminLTE/admin/ville/ville.view.html',
                controller: 'villeCtrl',
                controllerAs: 'vm'
            })
            .when('/editville/:id', {
                templateUrl: '/AdminLTE/admin/ville/editVille.view.html',
                controller: 'editvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/addville', {
                templateUrl: '/AdminLTE/admin/ville/addVille.view.html',
                controller: 'addvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/showville/:id', {
                templateUrl: '/AdminLTE/admin/ville/showVille.view.html',
                controller: 'showvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/service', {
                templateUrl: '/AdminLTE/admin/services/services.view.html',
                controller: 'servicesCtrl',
                controllerAs: 'vm'
            })
            .when('/editservice/:id', {
                templateUrl: '/AdminLTE/admin/services/editService.view.html',
                controller: 'editserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/addservice', {
                templateUrl: '/AdminLTE/admin/services/addService.view.html',
                controller: 'addserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/showservice/:id', {
                templateUrl: '/AdminLTE/admin/services/showService.view.html',
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

                /// gestion salon admin ///
            .when('/salonadmin', {
                templateUrl: '/AdminLTE/admin/gestionsalon/salon.view.html',
                controller: 'salonadminCtrl',
                controllerAs: 'vm',

            })
            .when('/showsalonadmin/:id', {
                templateUrl: '/AdminLTE/admin/gestionsalon/showSalon.view.html',
                controller: 'showsalonadminCtrl',
                controllerAs: 'vm',

            })
            /////gestion salon/////
            .when('/salon', {
                templateUrl: '/AdminLTE/salon/gestionsalon/salon.view.html',
                controller: 'salonCtrl',
                controllerAs: 'vm',

            })
            .when('/addsalon', {
                templateUrl: '/AdminLTE/salon/gestionsalon/addSalon.view.html',
                controller: 'addsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/editsalon/:id', {
                templateUrl: '/AdminLTE/salon/gestionsalon/editsalon.view.html',
                controller: 'editsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/showsalon/:id', {
                templateUrl: '/AdminLTE/salon/gestionsalon/showSalon.view.html',
                controller: 'showsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/profilesalon/:id', {
                templateUrl: '/AdminLTE/salon/profile/profile.view.html',
                controller: 'profileCtrl',
                controllerAs: 'vm'
            })
            .when('/editprofilesalon/:id', {
                templateUrl: '/AdminLTE/salon/profile/editProfile.view.html',
                controller: 'editprofilesalonCtrl',
                controllerAs: 'vm'
            })
            .when('/addsalonprofile/:id', {
                templateUrl: '/AdminLTE/salon/profile/addSalon.view.html',
                controller: 'addsalonprofileCtrl',
                controllerAs: 'vm'
            })
            /// proposerservice
            .when('/proposerservice', {
                templateUrl: '/AdminLTE/salon/proposerservice/addServicepro.view.html',
                controller: 'addserviceproposerCtrl',
                controllerAs: 'vm'
            })
            ////////////////////////////// Gestion des employes //////////////////
            .when('/addemploye/:id', {
                templateUrl: '/AdminLTE/salon/employe/addEmploye.view.html',
                controller: 'addemployeCtrl',
                controllerAs: 'vm'
            })
            .when('/employe/:id', {
                templateUrl: '/AdminLTE/salon/employe/employe.view.html',
                controller: 'employeCtrl',
                controllerAs: 'vm'
            })
            .when('/editemploye/:id/:employeId', {
                templateUrl: '/AdminLTE/salon/employe/editEmploye.view.html',
                controller: 'editemployeCtrl',
                controllerAs: 'vm'
            })
            .when('/showemploye/:id', {
                templateUrl: '/AdminLTE/salon/employe/showEmploye.view.html',
                controller: 'showemployeCtrl',
                controllerAs: 'vm'
            })
                ///////////////////salonservice////////////////////
            .when('/addsalonservice/:id', {
                templateUrl: '/AdminLTE/salon/services/addService.view.html',
                controller: 'addsalonserviceCtrl',
                controllerAs: 'vm'
            })





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