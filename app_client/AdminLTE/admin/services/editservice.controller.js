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
            url: '/gestionusers/categandscatg'
        }).success(function (data) {
            $scope.catgs = data; // response data
            console.log(data)
        });


        $scope.updateService = function () {
            $http.put('/gestionusers/service/' + $scope.service._id, $scope.service)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre service à été Modifier avec success", "success");
                    $location.url('/admin/service')
                })
        }
    }

})();
