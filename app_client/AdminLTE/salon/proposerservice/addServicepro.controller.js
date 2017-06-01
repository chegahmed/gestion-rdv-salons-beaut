(function () {

    angular
        .module('meanApp')
        .controller('addserviceproposerCtrl', addserviceproposerCtrl);

    addserviceproposerCtrl.$inject = ['$scope', '$http', '$location','Upload', '$routeParams','$window'];
    function addserviceproposerCtrl($scope, $http, $location,Upload, $routeParams,$window) {



        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
            //   console.log(data)
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgs = data; // response data
            //   console.log(data)
        });



        var vm = this;



        vm.onSubmit = function () {
            console.log('Submitting registration');
            $scope.messaguser="add success";
            $http.post('/gestionusers/servicepropose', $scope.service)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre proposition de service à été Envoyer à l'administration avec success", "success");
                    $location.url('/admin/listsalonservice')
                })
                .error(function(err){
                    alert(err);
                })
                .then(function(){
                    $location.path('/admin/listsalonservice');
                });
        };




    }

})();