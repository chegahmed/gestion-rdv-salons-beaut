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
            swal({
                title: "vous êtes sûr ?",
                text: "Êtes-vous sûr de vouloir supprimer cette sous catégorie ?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "oui , Supprimer!",
                confirmButtonColor: "#ec6c62"
            }, function() {

                $http.delete("/gestionusers/sservice/" + service._id).success(function (response) {
                    var index = $scope.sservices.indexOf(service)
                    $scope.sservices.splice( index ,1);
                    swal("Supprimer!", "sous catégorie a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });

        }





        //ici pour serche
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }
    }
})();

