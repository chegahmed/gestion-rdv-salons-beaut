(function () {

    angular
        .module('meanApp')
        .controller('gestionusersCtrl', gestionusersCtrl);

    gestionusersCtrl.$inject = ['$scope', '$http','$location'];
    function gestionusersCtrl($scope, $http ,$location) {

        $scope.names = ["Emil", "Tobias", "Linus"];
        $scope.message = "hello ahmed";

        $scope.users =[];
        $http({
            method: 'GET',
            url: '/gestionusers'
        }).success(function (data) {
            $scope.users = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });



        $scope.showSearch =function showSearch(value) {
            if(value==""){
                $http({
                    method: 'GET',
                    url: '/gestionusers'
                }).success(function (data) {
                    $scope.users = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }else{
                $http({
                    method: 'GET',
                    url: 'gestionusers/usersearch/'+value
                }).success(function (data) {
                    $scope.users = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }
        }






        $scope.deleteUser = function deleteUser(user) {
            swal({
                    title : '',
                    text: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Annuler",
                    closeOnConfirm: false,
                    confirmButtonText: "Confirmer",
                    confirmButtonColor: "#ec6c62"
                }, function() {

                $http.delete("/gestionusers/" + user._id).success(function (response) {
                    var index = $scope.users.indexOf(user)
                    $scope.users.splice(index, 1);
                    swal("", "utilisateur a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });
        }





    }

})();


/*
 .success(function (response) {
 //  window.location.reload();
 //  $scope.user.pop(user);
 $state.go('/', {}, {reload: true});

 })*/
