(function () {

    angular
        .module('meanApp')
        .controller('indispCtrl', indispCtrl);

    indispCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function indispCtrl($scope, $http ,$location, $routeParams) {

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


//this for get all indisponibilites by id user 'responsable salon'
        $http({
            method: 'GET',
            url: '/gestionusers/indisponible/'+id
        }).success(function (data) {
            $scope.indisps = data; // response data

        }).error(function (response) {
            console.log('error message :',response);
        });



//this for get all employe by id user 'responsable salon'
        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.employes = data; // response data
            console.log(data)
        }).error(function (response) {
            console.log('error message :',response);
        });



//this methods for delete indisponibilite
        $scope.deleteIndisp = function deleteIndisp(indisp) {
            console.log(indisp)
            swal({
                title : '',
                text: "Êtes-vous sûr de vouloir supprimer cet indisponibilité ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "Confirmer",
                confirmButtonColor: "#ec6c62"
            }, function() {
                $http.delete("/gestionusers/indisponible/" + indisp._id).success(function (response) {
                    var index = $scope.indisps.indexOf(indisp)
                    $scope.indisps.splice(index, 1);
                    swal("", "indisponibilité à été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });
            });
        }


        //this method for display search  indisp
        $scope.showSearch =function showSearch(value) {
            console.log(value)
            if(value==""){
                $http({
                    method: 'GET',
                    url: '/gestionusers/indisponible/'+id
                }).success(function (data) {
                    $scope.indisps = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }else{
                $http({
                    method: 'GET',//+id+'/'+
                    url: '/gestionusers/indisponiblesearch/'+id+'/'+value
                }).success(function (data) {
                    $scope.indisps = data; // response data
                });
            }
        }
        
        
        
        
    }

})();


