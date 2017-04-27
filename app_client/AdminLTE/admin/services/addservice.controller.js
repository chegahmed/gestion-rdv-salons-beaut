(function () {

    angular
        .module('meanApp')
        .controller('addserviceCtrl', addserviceCtrl);

    addserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addserviceCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";


        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
            console.log(data)
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgs = data; // response data
            console.log(data)
        });


        var vm = this;



        vm.onSubmit = function () {
            if( $scope.service.name==null){
                sweetAlert("erreur...", "l'un des  champs de votre formulaire est vide!", "error");

            }else {
                $http.post('/gestionusers/service/', $scope.service)
                    .success(function (response) {
                        sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
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




    }

})();
