(function () {

    angular
        .module('meanApp')
        .controller('listrdvCtrl', listrdvCtrl);

    listrdvCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function listrdvCtrl($scope, $http ,$location, $routeParams) {



        var id = $routeParams.userid;


//this for get profile user
        $http({
            method: 'GET',
            url: '/gestionusers/'+id
        }).success(function (data) {
            $scope.profile = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


//this for get all RDV by id user 'responsable salon'
        $http({
            method: 'GET',
            url: '/gestionusers/rendezvous/'+id
        }).success(function (data) {
            $scope.rdvs = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        //this for get all RDV not confirm by id user 'responsable salon'
        $http({
            method: 'GET',
            url: '/gestionusers/rdvnotconfirm/'+id
        }).success(function (data) {
            $scope.rdvsnotconfirm = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


//this methods for Confirm RDV
        $scope.confirmRDV =function (rendezvous) {
            $http.put('/gestionusers/confirmrdv/' + rendezvous._id)
                .success(function (response) {
                    var index = $scope.rdvsnotconfirm.indexOf(rendezvous)
                    $scope.rdvsnotconfirm.splice(index, 1);
                    sweetAlert("félicitation...", "Votre RDV et Confirmé avec success", "success");
                })
        }



//this methods for delete RDV
        $scope.deleteRDV = function deleteRDV(rendezvous) {
            swal({
                title : '',
                text: "Êtes-vous sûr de vouloir supprimer cet rendez-vous ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "Confirmer",
                confirmButtonColor: "#ec6c62"
            }, function() {
                $http.delete("/gestionusers/rendezvous/" + rendezvous._id).success(function (response) {
                    var index = $scope.rdvs.indexOf(rendezvous)
                    $scope.rdvs.splice(index, 1);
                    swal("", "rendez-vous a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });
            });
        }


//this method for display search  RDV
        $scope.showSearch =function showSearch(value) {
            if(value==""){
                $http({
                    method: 'GET',
                    url: '/gestionusers/rendezvous/'+id
                }).success(function (data) {
                    $scope.rdvs = data; // response data
                }).error(function (response) {
                    console.log('error message :',response);
                });
            }else{
                $http({
                    method: 'GET',//+id+'/'+
                    url: '/gestionusers/rendezvoussearch/'+id+'/'+value
                }).success(function (data) {
                    $scope.rdvs = data; // response data
                });
            }
        }





    }

})();


