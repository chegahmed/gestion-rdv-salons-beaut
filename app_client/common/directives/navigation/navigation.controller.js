(function () {

  angular
    .module('meanApp')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$location','authentication','$scope'];
  function navigationCtrl($location, authentication,$scope) {
    var vm = this;


   vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();


    vm.logout =function logout() {
      authentication.logout()
          .error(function(err){
            alert(err);
          })

    }

  }

})();