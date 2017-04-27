(function () {

    angular
        .module('meanApp')
        .controller('addsalonserviceCtrl', addsalonserviceCtrl);

    addsalonserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addsalonserviceCtrl($scope, $http, $location, $routeParams) {

        var id = $routeParams.id;

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgss = data; // response data

            console.log('iciiiiiiiii out');
            angular.forEach( $scope.scatgss , function(value, key){


                console.log('iciiiiiiiii');


            });




        });




        $http({
            method: 'GET',
            url: '/gestionusers/'+id
        }).success(function (data) {
            $scope.profile = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/getallmysalon/'+id
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
            //console.log(data)
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgs = data; // response data
          ///  console.log(data)
        });

        $http({
            method: 'GET',
            url: '/gestionusers/service'
        }).success(function (data) {
            $scope.services = data; // response data
          ///  console.log(data)
        });



        $http({
            method: 'GET',
            url: '/gestionusers/allemployer/'+id
        }).success(function (data) {
            $scope.employes = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


$scope.init= function (val){
    $http({
        method: 'GET',
        url: '/gestionusers/categorie'
    }).success(function (data) {
        $scope.catgs = data; // response data
        angular.forEach($scope.catgs, function(value, key){

          //  return 'inci my data'+value.name;
            if(value._id == val){
                console.log(value.name)
                return value.name;
            }

        });


    });


        }

       // $scope.initt('5900a05c81126113201f358d');

      /*  $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
            angular.forEach($scope.catgs, function(value, key){
                console.log('inci my data'+value.name)
            });

        });*/



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
