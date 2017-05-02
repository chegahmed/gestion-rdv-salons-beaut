(function () {

    angular
        .module('meanApp')
        .controller('listserviceCtrl', listserviceCtrl);

    listserviceCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams','$window'];
    function listserviceCtrl($scope, $http, $location,Upload, $routeParams,$window) {


        $scope.message ="hello world";

        var id = $routeParams.id;



        $http({
            method: 'GET',
            url: '/gestionusers/'+id
        }).success(function (data) {
            $scope.profile = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/getallmysalon/'+id
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/servicesalon'
        }).success(function (data) {
            $scope.services = data; // response data
            console.log('ici tableaux services')
            console.log(data)

        });



        $scope.deleteServicesalon = function deleteServicesalon(service) {
            swal({
                title : '',
                text: "Êtes-vous sûr de vouloir supprimer cet Service ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "Confirmer",
                confirmButtonColor: "#ec6c62"
            }, function() {

                $http.delete("/gestionusers/servicesalon/" + service._id).success(function (response) {
                    var index = $scope.salons.indexOf(service)
                    $scope.services.splice(index, 1);
                    swal("", "service a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });
        }


    }

})();