(function () {

    angular
        .module('meanApp')
        .controller('addsalonserviceCtrl', addsalonserviceCtrl);

    addsalonserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addsalonserviceCtrl($scope, $http, $location, $routeParams) {

        var id = $routeParams.id;




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

$scope.initIndex = function (index){

           index ++;
        }


        var vm = this;



        vm.onSubmit = function () {

            console.log('ici methode post  '+ $scope.service.name)
         /*   if( $scope.service.name==null){
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

            };*/
        }





        $scope.formData = {};

        $scope.save = function (da) {

            angular.forEach(da, function(value, key) {
                angular.forEach(value, function(valu, ke) {

                    $scope.serviceproposer =valu;
                    if(valu.time!=null && valu.price!=null && valu.employe!=null){
                        $http.post('/gestionusers/servicepropose/', $scope.serviceproposer)
                            .success(function (response) {
                                //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
                             // $location.url('/service')
                                $scope.valuecheckbox[valu.name] =  "valider"
                                console.log('bieeeeeeeeeen')
                            })

                    }else {
                        console.log('error')
                    }
                });

            });

           // sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
            /*angular.forEach(da, function(value, key) {
               $scope.serviceproposer =value;
                if(value.time!=null && value.price!=null && value.employe!=null){
                    $http.post('/gestionusers/servicepropose/', $scope.serviceproposer)
                        .success(function (response) {
                             //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
                           /!*  $location.url('/service')*!/
                        })
                        .error(function(err){
                            alert(err);
                        })
                }else {
                    console.log('error')
                }
            })*/
        };























    }

})();
