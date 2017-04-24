(function () {

    angular
        .module('meanApp')
        .controller('showsalonCtrl', showsalonCtrl);

    showsalonCtrl.$inject = ['$scope', '$http',  '$routeParams'];
    function showsalonCtrl($scope, $http,  $routeParams) {






        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/salon/' + id
        }).success(function (data) {
            $scope.salon = data; // response data
        });

    }

})();
