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
            swal({
                title: "vous êtes sûr ?",
                text: "Êtes-vous sûr de vouloir supprimer cette Ville ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "oui , Supprimer!",
                confirmButtonColor: "#ec6c62"
            }, function() {

                $http.delete("/gestionusers/ville/" + ville._id).success(function (response) {
                    var index = $scope.villes.indexOf(ville)
                    $scope.villes.splice( index ,1);
                    swal("Supprimer!", "ville a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });

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

