(function () {

  angular
    .module('meanApp')
    .controller('headersalonCtrl', headersalonCtrl);

  headersalonCtrl.$inject = ['$location','authentication','$scope'];
  function headersalonCtrl($location, authentication,$scope) {
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