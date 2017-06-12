/**
 * Created by ahmed on 20/04/2017.
 */
(function () {

    angular
        .module('meanApp')
        .controller('addsalonprofileCtrl', addsalonprofileCtrl);

    addsalonprofileCtrl.$inject = ['$scope', '$http','Upload', '$location', '$routeParams','$window'];
    function addsalonprofileCtrl($scope, $http, Upload, $location, $routeParams, $window) {


        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgs = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });
        $http({
            method: 'GET',
            url: '/gestionusers/ville'
        }).success(function (data) {
            $scope.villes = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        var id = $routeParams.id;

        $scope.idresponsable =id;
        $http({
            method: 'GET',
            url: '/gestionusers/'+id
        }).success(function (data) {
            $scope.profile = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        var vm = this;

        vm.onSubmit = function () {
            if ($scope.salon.img!=null ) { //check if from is valid
                vm.upload($scope.salon.img,$scope.salon.name,$scope.salon.address,$scope.salon.categorie,
                    $scope.salon.description,$scope.salon.scategorie,$scope.salon.ville,$scope.salon.idresponsable); //call upload function
            }else{
                sweetAlert("erreur...", "l'une des champs est vide!", "error");
            }

        };

        vm.upload = function (file,name,address,categorie,description,scategorie,ville,idresponsable) {
            Upload.upload({
                url: '/gestionusers/salon/',  //webAPI exposed to upload the file
                data:{file:file,name:name,address:address,categorie:categorie,description:description,scategorie:scategorie,ville:ville,idresponsable:idresponsable}// pass file as data, should be user ng-model
            } ).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    sweetAlert("félicitation...", 'votre salon à été ajoute avec succès', "success");
                    $location.path('admin/profilesalon/'+id)
                } else {
                    sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                }
            }, function (resp) { //catch error
                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };



    }

})();
