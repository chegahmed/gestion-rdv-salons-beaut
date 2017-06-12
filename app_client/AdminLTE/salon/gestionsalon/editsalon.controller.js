(function () {

    angular
        .module('meanApp')
        .controller('editsalonCtrl', editsalonCtrl);

    editsalonCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams'];
    function editsalonCtrl($scope, $http, $location,Upload, $routeParams) {



        var id = $routeParams.id;
        var userid = $routeParams.userid;


        $http({
            method: 'GET',
            url: '/gestionusers/salon/'+id
        }).success(function (data) {
            $scope.salon = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

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


        $scope.updateSalon = function () {
            console.log('ici update salon')
            if ($scope.salon.img!=null ) { //check if from is valid
                console.log('ici with img')
                $scope.updateSalonwithimag($scope.salon.img,$scope.salon.name,$scope.salon.address,$scope.salon.categorie,$scope.salon.description,$scope.salon.scategorie,$scope.salon.ville,$scope.salon.idresponsable)
            }else if($scope.salon.img ==null){
                $scope.updateSalonSansImg()
            }else{
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
            }
        }

        $scope.updateSalonwithimag = function(file,name,address,categorie,description,scategorie,ville,idresponsable){
            console.log('ici in function update salon ith img')
            Upload.upload({
                method: 'PUT',
                url: '/gestionusers/salonwittimg/'+$scope.salon._id, //webAPI exposed to upload the file
                data:{file:file,name:name,address:address,categorie:categorie,description:description,scategorie:scategorie,ville:ville,idresponsable:idresponsable}// pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                sweetAlert("félicitation...", 'votre salon à été Modifier avec succès', "success");
                $location.path('/admin/profilesalon/'+userid)

            }, function (resp) { //catch error
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress =  progressPercentage ; // capture upload progress
            });
        }



        $scope.updateSalonSansImg=function(){
            $http.put('/gestionusers/salon/' + $scope.salon._id, $scope.salon)
                .success(function (response) {
                    sweetAlert("félicitation...", "le salon est Modifier avec success", "success");
                    $location.url('/admin/profilesalon/'+userid)
                })
        }


    }

})();
