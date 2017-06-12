
(function () {

    angular
        .module('userApp')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$http','$location'];
    function userCtrl($scope, $http, $location) {


        var vm = this;
        vm.submit = function() { //function to call on form submit
           console.log('ici function submit')


            if($scope.salon.name!=null){
                angular.forEach($scope.salonslist,function (s) {
                    if(s.name==$scope.salon.name){

                        $location.path('/rdvlistservices/'+s._id)
                    }
                })
                console.log($scope.salon.name)
            }else if( $scope.salon.categorie !=null && $scope.salon.ville!=null){
                $location.path('/rdvlistsalons/ville='+$scope.salon.ville+'?categorie='+$scope.salon.categorie)
            }else if($scope.salon.ville!=null && $scope.salon.categorie ==null){
                $location.path('/rdvlistsalons/'+$scope.salon.ville)
            }

        }




        $http({
            method: 'GET',
            url: '/gestionusers/ville'
        }).success(function (data) {
            $scope.villes = data; // response data
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.souscategories = data; // response data
            //   console.log(data)
        });


        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
            //   console.log(data)
        });

        $http({
            method: 'GET',
            url: '/gestionusers/salon/'
        }).success(function (data) {
            $scope.salonslist =data;
        });

        // saisie du nom de la carte
        $scope.salon = null;


        $scope.listeSalon = function () {
            $http({
                method: 'GET',
                url: 'routefrontoffice/rdvsalon/' + $scope.salon.ville
            }).success(function (data) {
                $scope.salons = data; // response data

                $location.path('/rdvlistsalons')
            });
        };

    }
})();