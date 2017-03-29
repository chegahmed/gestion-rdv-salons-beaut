(function () {

    angular
        .module('meanApp')
        .controller('villeCtrl', villeCtrl);

    villeCtrl.$inject = ['$scope', '$http'];
    function villeCtrl($scope, $http) {

        $scope.names = ["Emil", "Tobias", "Linus"];
        $scope.message = "hello ahmed";


        $http({
            method: 'GET',
            url: '/gestionusers/ville'
        }).success(function (data) {
            $scope.villes = data; // response data
            console.log(data)
        });


        $scope.deleteVille = function deleteVille(ville) {
            $scope.messaguser = "delete success";
            $http.delete("/gestionusers/ville/" + ville._id).then(function () {
                $scope.villes.pop(ville);
            })
        }


        // ici pour pagination
        $scope.curPage = 0;
        $scope.pageSize = 2;

        $scope.numberOfPages = function () {
            return Math.ceil($scope.villes.length / $scope.pageSize);
        };

        //ici pour serche
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;

        }


    }

})();

