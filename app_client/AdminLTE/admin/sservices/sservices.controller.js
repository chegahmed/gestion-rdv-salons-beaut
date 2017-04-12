(function () {

    angular
        .module('meanApp')
        .controller('sservicesCtrl', sservicesCtrl);

    sservicesCtrl.$inject = ['$scope', '$http'];
    function sservicesCtrl($scope, $http) {

        $scope.names = ["Emil", "Tobias", "Linus"];
        $scope.message = "hello ahmed";


        $http({
            method: 'GET',
            url: '/gestionusers/sservice'
        }).success(function (data) {
            $scope.sservices = data; // response data
            console.log(data)
        });

        $scope.deleteSservice = function deletesservice(service) {
            $scope.messaguser = "delete success";
          //  $scope.sservices.splice( service._id,3);
            $http.delete("/gestionusers/sservice/" + service._id).success(function (response) {
                var index = $scope.sservices.indexOf(service)
              $scope.sservices.splice( index ,1);
            })
        }





        //ici pour serche
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }
    }
})();

