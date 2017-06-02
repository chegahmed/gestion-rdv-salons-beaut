(function () {

    angular
        .module('meanApp')
        .controller('editsouscategorieCtrl', editsouscategorieCtrl);

    editsouscategorieCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams','$window'];
    function editsouscategorieCtrl($scope, $http, $location,Upload, $routeParams,$window) {



        $scope.categorie = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/categorie/'+ id
        }).success(function (data) {
            $scope.categorie = data; // response data
        });

        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
            //   console.log(data)
        });




        $scope.updateCategorie=function(){

            if ($scope.categorie.img && $scope.categorie.name!=null ) { //check if from is valid

                $scope.updateCategoriewithimag($scope.categorie.img,$scope.categorie.name)
            }else if($scope.categorie.img ==null && $scope.categorie.name!=""){

                $scope.updateCategorieSansimg()
            }else{
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
            }

        }



        $scope.updateCategoriewithimag =function (file,name) {
            Upload.upload({
                method: 'PUT',
                url: 'gestionusers/categoriepm/'+$scope.categorie._id, //webAPI exposed to upload the file
                data:{file:file,name: name} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                sweetAlert("félicitation...", 'votre Sous catégorie à été Modifier avec succès', "success");
                $location.path('/admin/souscategorie')

            }, function (resp) { //catch error
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
            }, function (evt) {
                //  console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //  console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                //  'progress: ' + progressPercentage + ' %
                $scope.progress =  progressPercentage ; // capture upload progress
            });
        };


        $scope.updateCategorieSansimg= function () {
            $http.put('/gestionusers/categorie/' + $scope.categorie._id, $scope.categorie)
                .success(function (response) {
                    sweetAlert("félicitation...", "votre Sous  catégorie à été Modifier avec succès", "success");
                    $location.url('/admin/souscategorie')
                })
                .error(function (err) {
                    sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                })
        }
    }

})();
