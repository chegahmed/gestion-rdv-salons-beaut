/**
 * Created by ahmed on 20/04/2017.
 */
(function () {

    angular
        .module('meanApp')
        .controller('addsalonCtrl', addsalonCtrl);

    addsalonCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addsalonCtrl($scope, $http, $location, $routeParams) {


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






        var vm = this;



        vm.onSubmit = function () {
            $http.post('/gestionusers/salon/', $scope.salon)
                .success(function (response) {
                    sweetAlert("félicitation...", response.name +' a été ajoute avec succès', "success")
                    $location.url('/admin/salon')
                })
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('/admin/salon');
                });
        };



    }

})();
