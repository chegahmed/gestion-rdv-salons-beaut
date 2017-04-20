
(function () {

    angular
        .module('meanApp')
        .controller('showcategorieCtrl', showcategorieCtrl);

    showcategorieCtrl.$inject = ['$scope', '$http',  '$routeParams'];
    function showcategorieCtrl($scope, $http,  $routeParams) {






        $scope.categorie = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/categorie/' + id
        }).success(function (data) {
            $scope.categorie = data; // response data
        });

    }

})();
