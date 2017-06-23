(function () {

    angular
        .module('meanApp')
        .controller('editindispCtrl', editindispCtrl);

    editindispCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editindispCtrl($scope, $http, $location, $routeParams) {



        var id = $routeParams.id;
        var userId = $routeParams.userId;


        $http({
            method: 'GET',
            url: '/gestionusers/indisp/' + id
        }).success(function (data) {
            $scope.indisp = data; // response data
            console.log(data)
        });



//this for get all employe by id user 'responsable salon'
        $http({
            method: 'GET',
            url: '/gestionusers/allemployer/'+userId
        }).success(function (data) {
            $scope.employes = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });



        $scope.updateIndisp = function () {
            if($scope.indisp.startTime >$scope.indisp.endRepos){
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier que votre repos et bien entre l'heure de commence et l'heure de terminée la journée !", "error");
            }else{
                $http.put('/gestionusers/indisponible/' + $scope.indisp._id, $scope.indisp)
                    .success(function (response) {
                        sweetAlert("félicitation...", "Votre Indisponibilite et Modifier avec success", "success");
                        $location.url('/admin/indisp/'+userId)
                    })
            }
        }



       
    }

})();
