
(function () {

    angular
        .module('userApp')
        .controller('userCtrl', userCtrl);

    userCtrl.$inject = ['$scope', '$http','$location'];
    function userCtrl($scope, $http, $location) {



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




        $scope.listeSalon = function () {
            console.log('ici list salon'+$scope.salon.ville)
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