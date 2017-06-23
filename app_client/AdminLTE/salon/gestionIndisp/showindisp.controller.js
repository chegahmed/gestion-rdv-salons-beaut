(function () {

    angular
        .module('meanApp')
        .controller('showindispCtrl', showindispCtrl);

    showindispCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function showindispCtrl($scope, $http, $location, $routeParams) {



        $scope.employe = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/indisp/' + id
        }).success(function (data) {
            $scope.indisp = data; // response data
        });



        //this for get all employe by id user 'responsable salon'
        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.employes = data; // response data
            console.log(data)
        }).error(function (response) {
            console.log('error message :',response);
        });


    }

})();
