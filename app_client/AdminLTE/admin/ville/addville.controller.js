(function () {

    angular
        .module('meanApp')
        .controller('addvilleCtrl', addvilleCtrl);

    addvilleCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addvilleCtrl($scope, $http, $location, $routeParams) {


        var vm = this;



        vm.onSubmit = function () {

            $http.post('/gestionusers/ville/', $scope.ville)
                .success(function (response) {
                    alert(response.name +' a été ajoute avec succès')
                    $location.url('/admin/ville')
                })
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('/admin/ville');
                });
        };



    }

})();
