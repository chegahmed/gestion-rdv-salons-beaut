(function () {

    angular
        .module('meanApp')
        .controller('editvilleCtrl', editvilleCtrl);

    editvilleCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editvilleCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";






        $scope.ville = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/ville/' + id
        }).success(function (data) {
            $scope.ville = data; // response data
        });

        $scope.updateVille = function () {
            $scope.messaguser="update success";
            console.log('ici fonction update user');
            $http.put('/gestionusers/ville/' + $scope.ville._id, $scope.ville)
                .success(function (response) {
                    $location.url('/ville')
                })
        }
    }

})();
