(function () {

    angular
        .module('meanApp')
        .controller('galerieCtrl', galerieCtrl);

    galerieCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams','$window'];
    function galerieCtrl($scope, $http, $location,Upload, $routeParams,$window) {

        var idresponsable = $routeParams.id;
        var idprofilesalon = $routeParams.idprofilesalon;



        ///this methode return all galerie by salon
        $http({
            method: 'GET',
            url: 'gestionusers/galerie/' + idprofilesalon
        }).success(function (data) {
            $scope.galeries = data; // response data
        });





        var vm = this;
        vm.submit = function(){ //function to call on form submit
            if ($scope.galerie.img) { //check if from is valid
                vm.upload($scope.galerie.img,idprofilesalon,idresponsable); //call upload function
            }else{
                sweetAlert("erreur...", "votre  champs est vide!", "error");
            }
        }

        vm.upload = function (file,idsalon,idresponsable) {

            Upload.upload({
                url: 'gestionusers/galerie', //webAPI exposed to upload the file
                data:{file:file,idprofilesalon: idprofilesalon,idresponsable:idresponsable} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                sweetAlert("félicitation...", 'votre image a été ajoute avec succès', "success");
                $window.location.reload();
               // $location.path('galerie/'+idprofilesalon+'/'+idresponsable)
            }, function (resp) { //catch error
                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };



        $scope.deleteGalerie = function deleteGalerie (galerie) {
            swal({
                title: "vous êtes sûr ?",
                text: "Êtes-vous sûr de vouloir supprimer cette image ?",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: "oui , Supprimer!",
                confirmButtonColor: "#ec6c62"
            }, function() {

                $http.delete("/gestionusers/galerie/" + galerie._id).success(function (response) {
                    var index = $scope.galeries.indexOf(galerie)
                    $scope.galeries.splice( index ,1);
                    swal("Supprimer!", "catégorie a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });


        }



    }

})();