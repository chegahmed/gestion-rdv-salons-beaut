(function () {

    angular
        .module('meanApp')
        .controller('showemployeCtrl', showemployeCtrl);

    showemployeCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function showemployeCtrl($scope, $http, $location, $routeParams) {



        $scope.employe = {};
        var id = $routeParams.id;

        $http({
            method: 'GET',
            url: '/gestionusers/salon/'
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        $http({
            method: 'GET',
            url: '/gestionusers/employer/' + id
        }).success(function (data) {
            $scope.employe = data; // response data
        });


    }

})();
