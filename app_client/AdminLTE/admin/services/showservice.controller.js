
(function () {

    angular
        .module('meanApp')
        .controller('showserviceCtrl', showserviceCtrl);

    showserviceCtrl.$inject = ['$scope', '$http',  '$routeParams'];
    function showserviceCtrl($scope, $http,  $routeParams) {






        $scope.service = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/service/' + id
        }).success(function (data) {
            $scope.service = data; // response data
        });

    }

})();
