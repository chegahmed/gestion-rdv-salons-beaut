(function () {

    angular
        .module('meanApp')
        .controller('employeCtrl', employeCtrl);

    employeCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function employeCtrl($scope, $http ,$location, $routeParams) {



        var id = $routeParams.id;


//this for get profile user
        $http({
            method: 'GET',
            url: '/gestionusers/'+id
        }).success(function (data) {
            $scope.profile = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


//this for get all employe by id user 'responsable salon'
        $http({
            method: 'GET',
            url: '/gestionusers/allemployer/'+id
        }).success(function (data) {
            $scope.employes = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


//this methods for delete employe
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


//this method for display search  employes
        $scope.showSearch =function showSearch(value) {
            console.log(value)
            if(value==""){
                $http({
                    method: 'GET',
                    url: '/gestionusers/allemployer/'+id
                }).success(function (data) {
                    $scope.employes = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }else{
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


