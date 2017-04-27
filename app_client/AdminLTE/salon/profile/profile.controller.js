(function () {

    angular
        .module('meanApp')
        .controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function profileCtrl($scope, $http ,$location, $routeParams) {



        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/'+id
        }).success(function (data) {
            $scope.profile = data; // response data
            console.log('profile name: '+$scope.profile.name +'profile email : '+$scope.profile.email  )
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






        $scope.deleteSalon = function deleteSalon(salon) {
            swal({
                title : '',
                text: "Êtes-vous sûr de vouloir supprimer cet salon ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "Confirmer",
                confirmButtonColor: "#ec6c62"
            }, function() {

                $http.delete("/gestionusers/salon/" + salon._id).success(function (response) {
                    var index = $scope.salons.indexOf(salon)
                    $scope.salons.splice(index, 1);
                    swal("", "salon a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });
        }




    }

})();


