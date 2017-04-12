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
            $scope.messaguser="update success";
            console.log('ici fonction update ');
            $http.put('/gestionusers/sservice/' + $scope.sservice._id, $scope.sservice)
                .success(function (response) {
                    alert(response.name +' modifier avec succès');
                    $location.url('/sservice')
                })
        }
    }

})();
