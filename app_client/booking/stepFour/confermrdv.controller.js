
(function () {

    angular
        .module('userApp')
        .controller('rdvconfirmCtrl', rdvconfirmCtrl);

    rdvconfirmCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function rdvconfirmCtrl($scope, $http, $location ,$routeParams) {



$scope.page1=true;
$scope.page2=false;



    }
})();