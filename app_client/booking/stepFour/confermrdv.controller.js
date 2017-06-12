
(function () {

    angular
        .module('userApp')
        .controller('rdvconfirmCtrl', rdvconfirmCtrl);

    rdvconfirmCtrl.$inject = ['$scope', '$http','$location','$routeParams','$localStorage'];
    function rdvconfirmCtrl($scope, $http, $location ,$routeParams,$localStorage) {


        $scope.selectedServices= $localStorage.listservices;


        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.employes = data; // response data
        })




   //this function for search RDV
        $scope.disprdv=true;
        $scope.ChercherRDV = function(date,service) {
console.log(date)
            $scope.disprdv=false;
            $scope.resSearch=[];

            $http({
                method: 'GET',
                url: 'routefrontoffice/chercherrdv/' + date                     // item.idemploye/...
            }).success(function (data) {
                $scope.resSearch[service._id] = data.data.rdvs[0];
                console.log(JSON.stringify($scope.resSearch[service._id]))
            });
        }

   // this function for  search next RDV
        $scope.ChercherRDVSuivant = function(date ,service) {
            console.log("ici date" +date)
            var date2 = (date+5*60)*1000;
            $scope.ChercherRDV(new Date(date2),service);
        }



    }
})();