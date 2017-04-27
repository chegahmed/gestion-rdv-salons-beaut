(function () {

    angular
        .module('meanApp')
        .controller('addsouscategorieCtrl', addsouscategorieCtrl);

    addsouscategorieCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams','$window'];
    function addsouscategorieCtrl($scope, $http, $location,Upload, $routeParams,$window) {



        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
         //   console.log(data)
        });




        var vm = this;
        vm.submit = function(){ //function to call on form submit
//vm.upload_form.file.$valid &&


            if ($scope.categorie.img && $scope.categorie.name!=null&&$scope.categorie.parent!=null ) { //check if from is valid

                vm.upload($scope.categorie.img,$scope.categorie.name,$scope.categorie.parent); //call upload function
            }else{

                sweetAlert("erreur...", "l'un des  champs de votre formulaire est vide!", "error");
            }
        }

        vm.upload = function (file,name,parent) {
            Upload.upload({
                url: 'gestionusers/categorie', //webAPI exposed to upload the file
                data:{file:file,name: name,parent:parent} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.error_code === 0){ //validate success
                    sweetAlert("félicitation...", 'voutre sous catégorie a été ajoute avec succès', "success");
                    $location.path('/souscategorie')
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
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };







    }

})();