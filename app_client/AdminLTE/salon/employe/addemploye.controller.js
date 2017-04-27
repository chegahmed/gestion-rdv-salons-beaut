/**
 * Created by ahmed on 20/04/2017.
 */
(function () {

    angular
        .module('meanApp')
        .controller('addemployeCtrl', addemployeCtrl);

    addemployeCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addemployeCtrl($scope, $http, $location, $routeParams) {



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
            $scope.employe.idresponsable = $scope.profile._id;
            $http.post('/gestionusers/employer/', $scope.employe)
                .success(function (response) {
                    sweetAlert("félicitation...", "votre employe "+response.name +' a été ajoute avec succès', "success")
                    $location.url('/employe/'+$scope.profile._id)
                })
                .error(function(err){
                 //   alert(err);
                    sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                })
        };



    }

})();
