(function () {

    angular
        .module('meanApp')
        .controller('agendaCtrl', agendaCtrl);

    agendaCtrl.$inject = ['$scope', '$http', '$location', '$routeParams','$window'];
    function agendaCtrl($scope, $http, $location, $routeParams,$window) {



        var id = $routeParams.idsalon;



        $http({
            method: 'GET',
            url: '/gestionusers/'+id
        }).success(function (data) {
            $scope.profile = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/getallsalonbyuser/'+id
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/allemployer/'+id
        }).success(function (data) {
            $scope.employes = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/agenda'
        }).success(function (data) {
            $scope.agendas = data; // response data
        });


       $scope.iduser=id;



    }

})();