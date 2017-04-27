(function () {

    angular
        .module('meanApp')
        .controller('employeCtrl', employeCtrl);

    employeCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function employeCtrl($scope, $http ,$location, $routeParams) {



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
            url: '/gestionusers/allemployer/'+id
        }).success(function (data) {
            $scope.employes = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });




        $scope.deleteEmploye = function deleteEmploye(employe) {
            swal({
                title : '',
                text: "Êtes-vous sûr de vouloir supprimer cet Employer ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "Confirmer",
                confirmButtonColor: "#ec6c62"
            }, function() {
                    $http.delete("/gestionusers/employer/" + employe._id).success(function (response) {
                        var index = $scope.employes.indexOf(employe)
                        $scope.employes.splice(index, 1);
                        swal("", "employer a été supprimé avec succès!", "success");
                    }).error(function (response) {
                        swal("Oops", "We couldn't connect to the server!", "error");
                    });

            });
        }



        $scope.showSearch =function showSearch(value) {
            console.log('here is ouuuuuuut')
            console.log(value)
            if(value==""){
                console.log('ici out searh')
                $http({
                    method: 'GET',
                    url: '/gestionusers/allemployer/'+id
                }).success(function (data) {
                    $scope.employes = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }else{
                console.log('ici in searh' )
                console.log(value)
                $http({
                    method: 'GET',//+id+'/'+
                    url: '/gestionusers/employersearch/'+id+'/'+value
                }).success(function (data) {
                    $scope.employes = data; // response data
                });
            }
        }





    }

})();


