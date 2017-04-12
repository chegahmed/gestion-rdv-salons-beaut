(function () {

    angular
        .module('meanApp')
        .controller('addsserviceCtrl', addsserviceCtrl);

    addsserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addsserviceCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";


        $http({
            method: 'GET',
            url: '/gestionusers/service'
        }).success(function (data) {
            $scope.services = data; // response data
            console.log(data)
        });


        var vm = this;



        vm.onSubmit = function () {
            console.log('Submitting registration');
            $scope.messaguser="add success";
            $http.post('/gestionusers/sservice/', $scope.sservice)
                .success(function (response) {
                    $location.url('/sservice')
                })
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('/sservice');
                });
        };



    }

})();
