(function () {

    angular
        .module('meanApp')
        .controller('showsalonprofileCtrl', showsalonprofileCtrl);

    showsalonprofileCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function showsalonprofileCtrl($scope, $http ,$location, $routeParams) {



        var idprofile = $routeParams.idprofilesalon;

        //this for get profilesalon by id
        $http({
            method: 'GET',
            url: '/gestionusers/profilsalon/'+ idprofile
        }).success(function (data) {
            var st =new Date(data.startTime)
            var et =new Date(data.endTime)
            data.startTime =st;
            data.endTime =et;

            $scope.profile = data; // response data
        });

        //this for get all salons
        $http({
            method: 'GET',
            url: '/gestionusers/salon'
        }).success(function (data) {
            $scope.salons = data; // response data
        });
        



    }

})();


