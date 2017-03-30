(function () {

  angular
  .module('meanApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication','$scope'];
  function loginCtrl($location, authentication,$scope) {
    $scope.message =true;

    $scope.names = ["Emil", "Tobias", "Linus"];
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .login(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('accueil');
        });
    };

  }

})();