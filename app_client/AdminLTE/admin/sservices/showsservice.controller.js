
(function () {

    angular
        .module('meanApp')
        .controller('showsserviceCtrl', showsserviceCtrl);

    showsserviceCtrl.$inject = ['$scope', '$http',  '$routeParams'];
    function showsserviceCtrl($scope, $http,  $routeParams) {






        $scope.sservice = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/sservice/' + id
        }).success(function (data) {
            $scope.sservice = data; // response data
        });

    }

})();
