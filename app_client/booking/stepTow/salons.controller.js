
(function () {

    angular
        .module('userApp')
        .controller('rdvsalonCtrl', rdvsalonCtrl);

    rdvsalonCtrl.$inject = ['$scope', '$http','$location', '$routeParams'];
    function rdvsalonCtrl($scope, $http, $location ,$routeParams) {

        $scope.message="hello world"

        var ville = $routeParams.ville;

console.log(ville)
            $http({
                method: 'GET',
                url: 'routefrontoffice/rdvsalon/' + ville
            }).success(function (data) {
                $scope.salons = data; // response data
            });






    }
})();