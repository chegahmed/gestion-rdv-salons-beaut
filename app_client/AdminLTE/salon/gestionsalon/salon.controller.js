(function () {

    angular
        .module('meanApp')
        .controller('salonCtrl', salonCtrl);

    salonCtrl.$inject = ['$scope', '$http','$location'];
    function salonCtrl($scope, $http ,$location) {

        $scope.names = ["Emil", "Tobias", "Linus"];
        $scope.message = "hello ahmed";

        $scope.salons =[];
        $http({
            method: 'GET',
            url: '/gestionusers/salon'
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });



        $scope.showSearch =function showSearch(value) {
            if(value==""){
                $http({
                    method: 'GET',
                    url: '/gestionusers/salon'
                }).success(function (data) {
                    $scope.salons = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }else{
                $http({
                    method: 'GET',
                    url: 'gestionusers/salonsearch/'+value
                }).success(function (data) {
                    $scope.salons = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }
        }






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
