(function () {

    angular
        .module('meanApp')
        .controller('addcategorieCtrl', addcategorieCtrl);

    addcategorieCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams','$window'];
    function addcategorieCtrl($scope, $http, $location,Upload, $routeParams,$window) {

        var vm = this;
        vm.submit = function(){ //function to call on form submit
//vm.upload_form.file.$valid &&
            console.log($scope.categorie.img)
            if ($scope.categorie.img && $scope.categorie.name!=null ) { //check if from is valid
                vm.upload($scope.categorie.img,$scope.categorie.name); //call upload function
            }else{
                sweetAlert("erreur...", "l'une des deux champs est vide!", "error");
            }
        }

        vm.upload = function (file,name) {
            console.log($scope.categorie.name);
            Upload.upload({
                url: 'gestionusers/categorie', //webAPI exposed to upload the file
                data:{file:file,name: name} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    sweetAlert("félicitation...", resp.config.data.file.name+' a été ajoute avec succès', "success");
                    $location.path('admin/categorie')
                } else {
                    sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                }
            }, function (resp) { //catch error
                // console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                //  console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //  console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };







    }

})();