
(function () {

    angular
        .module('meanApp')
        .controller('showsouscategorieCtrl', showsouscategorieCtrl);

    showsouscategorieCtrl.$inject = ['$scope', '$http',  '$routeParams'];
    function showsouscategorieCtrl($scope, $http,  $routeParams) {






        $scope.categorie = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/categorie/' + id
        }).success(function (data) {
            $scope.souscategorie = data; // response data
        });



        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
        });

    }

})();
