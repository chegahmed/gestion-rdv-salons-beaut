

(function () {

    angular
        .module('userApp')
        .controller('salonprofileCtrl', salonprofileCtrl);

    salonprofileCtrl.$inject = ['$scope', '$http','$location','$routeParams','$sessionStorage','$timeout'];
    function salonprofileCtrl($scope, $http, $location ,$routeParams,$sessionStorage, $timeout) {

        var idsalon = $routeParams.idsalon;


        ///this methode return salon by id salon
        $http({
            method: 'GET',
            url: '/gestionusers/salon/' + idsalon
        }).success(function (data) {
            $scope.salon = data; // response data
        });


        ///this methode return category and sub-category by id salon
        $http({
            method: 'GET',
            url: '/routefrontoffice/rdvcatg/' + idsalon
        }).success(function (data) {
            $scope.AllCatg = data; // response data
        });


        ///this methode return all salonservice by id salon
        $http({
            method: 'GET',
            url: 'routefrontoffice/rdvservice/' + idsalon
        }).success(function (data) {
            $scope.salonservices = data; // response data
        });


        ///this methode return all salonservice by id salon
        $http({
            method: 'GET',
            url: 'gestionusers/lastimggalerie/' + idsalon
        }).success(function (data) {
            $scope.salonservices = data; // response data
        });


        ///this methode return profilsalon by id salon
        $http({
            method: 'GET',
            url: 'gestionusers/profilsalonbysalon/' + idsalon
        }).success(function (data) {
            var st =new Date(data.startTime)
            var et =new Date(data.endTime)
            data.startTime =st;
            data.endTime =et;
            $scope.profilsalon = data; // response data


            ///this methode return last 4 image in galerie
            $http({
                method: 'GET',
                url: 'gestionusers/lastimggalerie/' +  $scope.profilsalon._id
            }).success(function (data) {
                console.log(data)
                $scope.galeries = data; // response data
            });

        });






    }
})();

