(function () {

    angular
        .module('meanApp')
        .controller('showemployeCtrl', showemployeCtrl);

    showemployeCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function showemployeCtrl($scope, $http, $location, $routeParams) {



        $scope.employe = {};
        var id = $routeParams.id;



        $http({
            method: 'GET',
            url: '/gestionusers/employer/' + id
        }).success(function (data) {
            $scope.employe = data; // response data
        });


    }

})();
