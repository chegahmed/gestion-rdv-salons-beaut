(function () {

    angular
        .module('meanApp')
        .controller('addsalonprofileCtrl', addsalonprofileCtrl);

    addsalonprofileCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addsalonprofileCtrl($scope, $http, $location, $routeParams) {

        var iduser = $routeParams.id;


        //this for get profile user
        $http({
            method: 'GET',
            url: '/gestionusers/'+iduser
        }).success(function (data) {
            $scope.user = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        //this for get all salon by user
        $http({
            method: 'GET',
            url: '/gestionusers/getallsalonbyuser/' + iduser
        }).success(function (data) {
            $scope.salons = data; // response data
        });


        //this for get all ville
        $http({
            method: 'GET',
            url: '/gestionusers/ville'
        }).success(function (data) {
            $scope.villes = data; // response data
        });



        /// this methode for save profilesalon
        var vm = this;

        vm.onSubmit = function () {
            $scope.salonprofile.idresponsable = $scope.user._id;
            if($scope.salonprofile.startTime >$scope.salonprofile.endTime){
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier l'heure de commence et  l'heure de terminée la journée !", "error");
            }else{
                $http.post('/gestionusers/profilsalon/', $scope.salonprofile)
                    .success(function (response) {
                        sweetAlert("félicitation...", "votre profile salon  a été ajoute avec succès", "success")
                        //   $location.url('/admin/salonprofile/'+$scope.user._id)
                    })
                    .error(function(err){
                        sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                    })
            }
        }






    }

})();
