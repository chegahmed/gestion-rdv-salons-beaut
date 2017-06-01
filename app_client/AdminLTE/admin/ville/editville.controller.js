(function () {

    angular
        .module('meanApp')
        .controller('editvilleCtrl', editvilleCtrl);

    editvilleCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editvilleCtrl($scope, $http, $location, $routeParams) {


        $scope.ville = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/ville/' + id
        }).success(function (data) {
            $scope.ville = data; // response data
        });

        $scope.updateVille = function () {
            $http.put('/gestionusers/ville/' + $scope.ville._id, $scope.ville)
                .success(function (response) {
                    sweetAlert("félicitation...", "la ville est Modifier avec success", "success");
                    $location.url('/admin/ville')
                })
        }
    }

})();
