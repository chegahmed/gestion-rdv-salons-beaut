(function () {

    angular
        .module('meanApp')
        .controller('addserviceCtrl', addserviceCtrl);

    addserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addserviceCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";


        var vm = this;



        vm.onSubmit = function () {
            console.log('Submitting registration');
            $scope.messaguser="add success";
            $http.post('/gestionusers/service/', $scope.service)
                .success(function (response) {
                    $location.url('/service')
                })
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('/service');
                });
        };



    }

})();
