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


        $http({
            method: 'GET',
            url: '/gestionusers/service/'
        }).success(function (dataa) {
            $scope.services = dataa; // response data
        });


        $scope.updateService = function () {
            $http.put('/gestionusers/service/' + $scope.service._id, $scope.service)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre service à été Modifier avec success", "success");
                    $location.url('/service')
                })
        }
    }

})();
