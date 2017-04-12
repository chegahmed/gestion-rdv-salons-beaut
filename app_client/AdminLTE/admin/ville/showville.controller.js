(function () {

    angular
        .module('meanApp')
        .controller('showvilleCtrl', showvilleCtrl);

    showvilleCtrl.$inject = ['$scope', '$http',  '$routeParams'];
    function showvilleCtrl($scope, $http,  $routeParams) {






        $scope.ville = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/ville/' + id
        }).success(function (data) {
            $scope.ville = data; // response data
        });

    }

})();
