(function () {

    angular
        .module('meanApp')
        .controller('editsalonprofileCtrl', editsalonprofileCtrl);

    editsalonprofileCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editsalonprofileCtrl($scope, $http, $location, $routeParams) {

        var iduser = $routeParams.id;
        var idprofile = $routeParams.idprofilesalon;


        //this for get profile user
        $http({
            method: 'GET',
            url: '/gestionusers/'+iduser
        }).success(function (data) {
            $scope.user = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        //this for get profilesalon by id
        $http({
            method: 'GET',
            url: '/gestionusers/profilsalon/' + idprofile
        }).success(function (data) {
            var st =new Date(data.startTime)
            var et =new Date(data.endTime)
            data.startTime =st;
            data.endTime =et;

            console.log(data._id)
            $scope.salonprofile = data; // response data
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

        vm.EditSalonprofile = function () {
            $scope.salonprofile.idresponsable = $scope.user._id;
            if($scope.salonprofile.startTime >$scope.salonprofile.endTime){
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier l'heure de commence et  l'heure de terminée la journée !", "error");
            }else{
                $http.put('/gestionusers/profilsalon/'+idprofile, $scope.salonprofile)
                    .success(function (response) {
                        sweetAlert("félicitation...", "votre profile salon  a été modifier avec succès", "success")
                        //   $location.url('/admin/salonprofile/'+$scope.user._id)
                    })
                    .error(function(err){
                        sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                    })
            }
        }






    }

})();
