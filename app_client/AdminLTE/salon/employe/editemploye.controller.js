(function () {

    angular
        .module('meanApp')
        .controller('editemployeCtrl', editemployeCtrl);

    editemployeCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editemployeCtrl($scope, $http, $location, $routeParams) {



        $scope.employe = {};
        var id = $routeParams.id;
        var employeId = $routeParams.employeId;



        $http({
            method: 'GET',
            url: '/gestionusers/employer/' + id
        }).success(function (data) {
            $scope.employe = data; // response data
        });

        $http({
            method: 'GET',
            url: '/gestionusers/getallmysalon/'+employeId
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        $scope.updateEmploye = function () {

            $http.put('/gestionusers/employer/' + $scope.employe._id, $scope.employe)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre Employer et Modifier avec success", "success");
                    $location.url('/employe/'+employeId)
                })
        }
    }

})();
