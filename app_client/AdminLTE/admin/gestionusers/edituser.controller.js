(function () {

    angular
        .module('meanApp')
        .controller('edituserCtrl', edituserCtrl);

    edituserCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function edituserCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";
 



        $scope.user = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/' + id
        }).success(function (data) {
            $scope.user = data; // response data
        });

        $scope.updateUser = function () {
            $scope.messaguser="update success";
            console.log('ici fonction update user')
            $http.put('/gestionusers/' + $scope.user._id, $scope.user)
                .success(function (response) {
                    $location.url('/')

                })
        }
    }

})();
