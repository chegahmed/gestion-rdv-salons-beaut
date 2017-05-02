(function () {

    angular
        .module('meanApp')
        .controller('propservCtrl', propservCtrl);

    propservCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams','$window'];
    function propservCtrl($scope, $http, $location,Upload, $routeParams,$window) {



        var id = $routeParams.id;
        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
            //   console.log(data)
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgs = data; // response data
            //   console.log(data)
        });


        $http({
            method: 'GET',
            url: '/gestionusers/getallmysalon/'+id
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        $http({
            method: 'GET',
            url: '/gestionusers/service'
        }).success(function (data) {
            $scope.services = data; // response data
            ///  console.log(data)
        });






    }

})();