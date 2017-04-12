(function () {

    angular
        .module('meanApp')
        .controller('showuserCtrl', showuserCtrl);

    showuserCtrl.$inject = ['$scope', '$http', '$routeParams'];
    function showuserCtrl($scope, $http, $routeParams) {

        $scope.messaguser = "update success";

        $scope.user = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/' + id
        }).success(function (data) {
            $scope.user = data; // response data
        });


    }

})();
