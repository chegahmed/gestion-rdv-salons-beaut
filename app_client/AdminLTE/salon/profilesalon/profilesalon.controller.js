(function () {

    angular
        .module('meanApp')
        .controller('profilesalonCtrl', profilesalonCtrl);

    profilesalonCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function profilesalonCtrl($scope, $http, $location, $routeParams) {

        var iduser = $routeParams.id;

        $http({
            method: 'GET',
            url: '/gestionusers/profilsalonbyresp/' + iduser
        }).success(function (data) {
            $scope.profilesalons = data; // response data
        });


        $http({
            method: 'GET',
            url: '/gestionusers/getallsalonbyuser/' + iduser
        }).success(function (data) {
            $scope.salons = data; // response data
        });


        //this for get profile user
        $http({
            method: 'GET',
            url: '/gestionusers/'+iduser
        }).success(function (data) {
            $scope.user = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });




        //this methods for delete profilesalonsonibilite
        $scope.deleteprofilesalon = function(profilsalon) {
            console.log(profilsalon)
            swal({
                title : '',
                text: "Êtes-vous sûr de vouloir supprimer cet profilesalonson  ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "Confirmer",
                confirmButtonColor: "#ec6c62"
            }, function() {
                console.log(profilsalon._id)
                $http.delete("/gestionusers/profilsalon/"+profilsalon._id).success(function (response) {
                    console.log(response)
                    var index = $scope.profilesalons.indexOf(profilsalon)
                    $scope.profilesalons.splice(index, 1);
                    swal("", "profilesalonsonibilité à été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });
            });
        }


    }

})();
