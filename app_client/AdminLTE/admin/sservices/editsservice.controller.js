(function () {

    angular
        .module('meanApp')
        .controller('editsserviceCtrl', editsserviceCtrl);

    editsserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editsserviceCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";





        $scope.sservice = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/sservice/' + id
        }).success(function (data) {
            $scope.sservice = data; // response data
        });


        $http({
            method: 'GET',
            url: '/gestionusers/service/'
        }).success(function (dataa) {
            $scope.services = dataa; // response data
        });


        $scope.updateSservice = function () {
            $http.put('/gestionusers/sservice/' + $scope.sservice._id, $scope.sservice)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre sous service Modifier avec success", "success");
                    $location.url('/sservice')
                })
        }
    }

})();
