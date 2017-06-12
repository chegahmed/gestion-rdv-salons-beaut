
(function () {

    angular
        .module('userApp')
        .controller('rdvsalonCtrl', rdvsalonCtrl);

    rdvsalonCtrl.$inject = ['$scope', '$http','$location', '$routeParams','$localStorage'];
    function rdvsalonCtrl($scope, $http, $location ,$routeParams,$localStorage) {



        var ville = $routeParams.ville;

            $http({
                method: 'GET',
                url: 'routefrontoffice/rdvsalon/' + ville
            }).success(function (data) {
                $scope.salons = data; // response data
            });


        $scope.descsalon =true
        $scope.CloseDescription =function(){
            $scope.descsalon =true
        }
        $scope.OpenDescription =function(){
            $scope.descsalon =false
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
        });


        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
        });

        $scope.range = function(min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };


        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.employes = data; // response data
        });


        $scope.NombreEmpl =function (id) {
            var i=0;
            angular.forEach($scope.employes,function (c) {
                if(c.idsalon==id){
                    i++
                }

            })
            return i;
        }

    }
})();