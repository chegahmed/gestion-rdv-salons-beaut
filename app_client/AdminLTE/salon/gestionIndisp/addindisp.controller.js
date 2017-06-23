(function () {

    angular
        .module('meanApp')
        .controller('addindispCtrl', addindispCtrl);

    addindispCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function addindispCtrl($scope, $http ,$location, $routeParams) {

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





        /// this methode for save indisponibilite
        var vm = this;

        vm.onSubmit = function () {
            if($scope.indisp.startTime >$scope.indisp.endTime){
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier que votre repos et bien entre l'heure de commence et l'heure de terminée la journée !", "error");
            }else{
                $scope.indisp.idresponsable = $scope.profile._id;
                $http.post('/gestionusers/indisponible/', $scope.indisp)
                    .success(function (response) {
                        sweetAlert("félicitation...", "votre Indisponibilité "+response.name +' a été ajoute avec succès', "success")
                        $location.url('/admin/indisp/'+$scope.profile._id)
                    })
                    .error(function(err){
                        sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                    })
            }
        }



















    }

})();


