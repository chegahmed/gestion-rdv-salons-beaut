(function () {

    angular
        .module('meanApp')
        .controller('showrdvCtrl', showrdvCtrl);

    showrdvCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function showrdvCtrl($scope, $http, $location, $routeParams) {




        var id = $routeParams.id;



        $http({
            method: 'GET',
            url: '/gestionusers/rendezvousbyid/' + id
        }).success(function (data) {
            $scope.rdv = data; // response data
        });


    }

})();
