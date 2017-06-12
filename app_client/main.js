(function () {

    angular.module('meanApp', ['ngRoute','angularUtils.directives.dirPagination','ngFileUpload']);

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/admin', {
                templateUrl:'/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/accueil', {
                templateUrl: '/AdminLTE/admin/gestionusers/gestionusers.view.html',
                controller: 'gestionusersCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/edituser/:id', {
                templateUrl: '/AdminLTE/admin/gestionusers/edituser.view.html',
                controller: 'edituserCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showuser/:id', {
                templateUrl: '/AdminLTE/admin/gestionusers/showUser.view.html',
                controller: 'showuserCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/adduser', {
                templateUrl: '/AdminLTE/admin/gestionusers/adduser.view.html',
                controller: 'adduserCtrl',
                controllerAs: 'vm'
            })
            ////gestion catégorie////
            .when('/admin/categorie', {
                templateUrl: '/AdminLTE/admin/categorie/categorie.view.html',
                controller: 'categorieCtrl',
                controllerAs: 'up'
            })
            .when('/admin/addcategorie', {
                templateUrl: '/AdminLTE/admin/categorie/addCategorie.view.html',
                controller: 'addcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/editcategorie/:id', {
                templateUrl: '/AdminLTE/admin/categorie/editCategorie.view.html',
                controller: 'editcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showcategorie/:id', {
                templateUrl: '/AdminLTE/admin/categorie/showCategorie.view.html',
                controller: 'showcategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/souscategorie', {
                templateUrl: '/AdminLTE/admin/souscategorie/souscategorie.view.html',
                controller: 'souscategorieCtrl',
                controllerAs: 'vm'
            })
            ////gestion sous catégorie////
            .when('/admin/addsouscategorie', {
                templateUrl: '/AdminLTE/admin/souscategorie/addSouscategorie.view.html',
                controller: 'addsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showsouscategorie/:id', {
                templateUrl: '/AdminLTE/admin/souscategorie/showSouscategorie.view.html',
                controller: 'showsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/editsouscategorie/:id', {
                templateUrl: '/AdminLTE/admin/souscategorie/editSouscategorie.view.html',
                controller: 'editsouscategorieCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/ville', {
                templateUrl: '/AdminLTE/admin/ville/ville.view.html',
                controller: 'villeCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/editville/:id', {
                templateUrl: '/AdminLTE/admin/ville/editVille.view.html',
                controller: 'editvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/addville', {
                templateUrl: '/AdminLTE/admin/ville/addVille.view.html',
                controller: 'addvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showville/:id', {
                templateUrl: '/AdminLTE/admin/ville/showVille.view.html',
                controller: 'showvilleCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/service', {
                templateUrl: '/AdminLTE/admin/services/services.view.html',
                controller: 'servicesCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/editservice/:id', {
                templateUrl: '/AdminLTE/admin/services/editService.view.html',
                controller: 'editserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/addservice', {
                templateUrl: '/AdminLTE/admin/services/addService.view.html',
                controller: 'addserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showservice/:id', {
                templateUrl: '/AdminLTE/admin/services/showService.view.html',
                controller: 'showserviceCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/profileuser', {
                templateUrl: '/utilisateur/user.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/header', {
                templateUrl: '/AdminLTE/admin/header.html',  //home/home.view.html
                controller: 'headerAdminCtrl',
                controllerAs: 'vm',

            })
            ////////////////////////////////////////here start for salone///////////////////////////////////
            .when('/admin/sallon', {
                templateUrl: '/AdminLTE/salon/rondezvous/index.view.html',
                controller: 'rdvsalonCtrl',
                controllerAs: 'vm'
            })

                /// gestion salon admin ///
            .when('/admin/salonadmin', {
                templateUrl: '/AdminLTE/admin/gestionsalon/salon.view.html',
                controller: 'salonadminCtrl',
                controllerAs: 'vm',

            })
            .when('/admin/showsalonadmin/:id', {
                templateUrl: '/AdminLTE/admin/gestionsalon/showSalon.view.html',
                controller: 'showsalonadminCtrl',
                controllerAs: 'vm',

            })
            /////gestion salon/////
            .when('/admin/salon', {
                templateUrl: '/AdminLTE/salon/gestionsalon/salon.view.html',
                controller: 'salonCtrl',
                controllerAs: 'vm',

            })
            .when('/admin/addsalon', {
                templateUrl: '/AdminLTE/salon/gestionsalon/addSalon.view.html',
                controller: 'addsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/editsalon/:id/:userid', {
                templateUrl: '/AdminLTE/salon/gestionsalon/editsalon.view.html',
                controller: 'editsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showsalon/:id', {
                templateUrl: '/AdminLTE/salon/gestionsalon/showSalon.view.html',
                controller: 'showsalonCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/profilesalon/:id', {
                templateUrl: '/AdminLTE/salon/profile/profile.view.html',
                controller: 'profileCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/editprofilesalon/:id', {
                templateUrl: '/AdminLTE/salon/profile/editProfile.view.html',
                controller: 'editprofilesalonCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/addsalonprofile/:id', {
                templateUrl: '/AdminLTE/salon/profile/addSalon.view.html',
                controller: 'addsalonprofileCtrl',
                controllerAs: 'vm'
            })
            ///  service proposer
            .when('/admin/proposerservice', {
                templateUrl: '/AdminLTE/salon/proposerservice/addServicepro.view.html',
                controller: 'addserviceproposerCtrl',
                controllerAs: 'vm'
            })

            //////////////////////propre service /////////////////////////

            .when('/admin/selfserv/:id', {
                templateUrl: '/AdminLTE/salon/salonservice/propserv.view.html',
                controller: 'propservCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/listsalonservice/:id', {
                templateUrl: '/AdminLTE/salon/salonservice/listservices.view.html',
                controller: 'listserviceCtrl',
                controllerAs: 'vm'
            })
            ////////////////////////////// Gestion des employes //////////////////
            .when('/admin/addemploye/:id', {
                templateUrl: '/AdminLTE/salon/employe/addEmploye.view.html',
                controller: 'addemployeCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/employe/:id', {
                templateUrl: '/AdminLTE/salon/employe/employe.view.html',
                controller: 'employeCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/editemploye/:id/:employeId', {
                templateUrl: '/AdminLTE/salon/employe/editEmploye.view.html',
                controller: 'editemployeCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showemploye/:id', {
                templateUrl: '/AdminLTE/salon/employe/showEmploye.view.html',
                controller: 'showemployeCtrl',
                controllerAs: 'vm'
            })
                ///////////////////salonservice////////////////////
            .when('/admin/addsalonservice/:id', {
                templateUrl: '/AdminLTE/salon/services/addService.view.html',
                controller: 'addsalonserviceCtrl',
                controllerAs: 'vm'
            })
            ////////////////////////////// Gestion des Agenda /////////////////////
            .when('/admin/agendasalon/:idsalon', {
                templateUrl: '/AdminLTE/salon/agenda/agenda.view.html',
                controller: 'agendaCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/bloquecreneauxagenda/:idemploye', {
                templateUrl: '/AdminLTE/salon/agenda/bloquecrenaux.view.html',
                controller: 'bloquecreneauagendaCtrl',
                controllerAs: 'vm'
            })

            ///////////////////////////GESTION DES RDV//////////////////
            .when('/admin/listrdv/:userid', {
                templateUrl: '/AdminLTE/salon/gestionRDV/listrdv.view.html',
                controller: 'listrdvCtrl',
                controllerAs: 'vm'
            })
            .when('/admin/showrdv/:id', {
                templateUrl: '/AdminLTE/salon/gestionRDV/showRDV.view.html',
                controller: 'showrdvCtrl',
                controllerAs: 'vm'
            })




            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }


    function run($rootScope, $location, authentication) {
        $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
         /*   if ($location.path() != '/register'&& !authentication.isLoggedIn()) {
                $location.path('/admin');
            }*/
        });
    }

    angular
        .module('meanApp')
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'authentication', run]);

})();