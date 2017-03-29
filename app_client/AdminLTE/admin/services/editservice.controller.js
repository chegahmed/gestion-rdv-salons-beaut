(function () {

    angular
        .module('meanApp')
        .controller('editserviceCtrl', editserviceCtrl);

    editserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editserviceCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";






        $scope.service = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/service/' + id
        }).success(function (data) {
            $scope.service = data; // response data
        });

        $scope.updateService = function () {
            $scope.messaguser="update success";
            console.log('ici fonction update user');
            $http.put('/gestionusers/service/' + $scope.service._id, $scope.service)
                .success(function (response) {
                    $location.url('/service')
                })
        }
    }

})();
