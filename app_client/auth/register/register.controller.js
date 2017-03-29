(function () {

  angular
    .module('meanApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication'];
  function registerCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : "",
      role: "",
      phoneNumber: ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          if( angular.equals(vm.credentials.role,"user")){
            $location.path('/');  //profileuser
          }else{
            $location.path('/');   //profile
          }
        });
    };

  }

})();