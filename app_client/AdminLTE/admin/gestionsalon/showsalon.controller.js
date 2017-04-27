(function () {

    angular
        .module('meanApp')
        .controller('showsalonadminCtrl', showsalonadminCtrl);

    showsalonadminCtrl.$inject = ['$scope', '$http',  '$routeParams'];
    function showsalonadminCtrl($scope, $http,  $routeParams) {






        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/salon/' + id
        }).success(function (data) {
            $scope.salon = data; // response data
        });

    }

})();
