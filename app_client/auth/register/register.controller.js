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
          $location.path('/accueil');
    /*      if( angular.equals(vm.credentials.role,"Admin")){
            $location.path('/accueil');  //profileuser
          } if( angular.equals(vm.credentials.role,"Utilisateur")){
            $location.path('/sallon');  //profileuser
          }else{
            $location.path('/');   //profile
          }*/
        });
    };

  }

})();