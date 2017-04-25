(function () {

    angular
        .module('meanApp')
        .controller('servicesCtrl', servicesCtrl);

    servicesCtrl.$inject = ['$scope', '$http'];
    function servicesCtrl($scope, $http) {



        $http({
            method: 'GET',
            url: '/gestionusers/categandscatg'
        }).success(function (data) {
            $scope.catgs = data; // response data
            console.log(data)
        });

        $http({
            method: 'GET',
            url: '/gestionusers/service'
        }).success(function (data) {
            $scope.services = data; // response data
            console.log(data)
        });

        $scope.deleteService = function deleteservice(service) {
            swal({
                title: "vous êtes sûr ?",
                text: "Êtes-vous sûr de vouloir supprimer cette sous catégorie ?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "oui , Supprimer!",
                confirmButtonColor: "#ec6c62"
            }, function() {

                $http.delete("/gestionusers/service/" + service._id).success(function (response) {
                    var index = $scope.services.indexOf(service)
                    $scope.services.splice( index ,1);
                    swal("Supprimer!", "sous catégorie a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });

        }

    }
})();

