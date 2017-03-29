(function () {

    angular
        .module('meanApp')
        .controller('servicesCtrl', servicesCtrl);

    servicesCtrl.$inject = ['$scope', '$http'];
    function servicesCtrl($scope, $http) {

        $scope.names = ["Emil", "Tobias", "Linus"];
        $scope.message = "hello ahmed";


        $http({
            method: 'GET',
            url: '/gestionusers/service'
        }).success(function (data) {
            $scope.services = data; // response data
            console.log(data)
        });


        $scope.deleteService = function deleteservice(service) {
            $scope.messaguser = "delete success";
            $http.delete("/gestionusers/service/" + service._id).then(function () {
                $scope.services.pop(service);
            })
        }


        // ici pour pagination
        $scope.curPage = 0;
        $scope.pageSize = 2;

        $scope.numberOfPages = function () {
            return Math.ceil($scope.services.length / $scope.pageSize);
        };

        //ici pour serche
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }
    }
})();

