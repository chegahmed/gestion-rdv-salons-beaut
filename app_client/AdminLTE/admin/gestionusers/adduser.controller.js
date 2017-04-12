(function () {

    angular
        .module('meanApp')
        .controller('adduserCtrl', adduserCtrl);

    adduserCtrl.$inject = ['$location', 'authentication'];
    function adduserCtrl($location, authentication) {
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
                    alert(vm.credentials.name+' a été ajoute avec succès')
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