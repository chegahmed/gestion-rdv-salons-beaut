(function () {

    angular
        .module('meanApp')
        .controller('addvilleCtrl', addvilleCtrl);

    addvilleCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addvilleCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";


        var vm = this;



        vm.onSubmit = function () {
            console.log('Submitting registration');
            $scope.messaguser="add success";
            $http.post('/gestionusers/ville/', $scope.ville)
                .success(function (response) {
                    alert(response.name +' a été ajoute avec succès')
                    $location.url('/ville')
                })
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('/ville');
                });
        };



    }

})();
