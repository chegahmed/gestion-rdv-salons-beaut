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

        $scope.existing = function(name){
            $http({
                method: 'GET',
                url: '/gestionusers/servicesalonbyidsalon/'+id+'/'+name
            }).success(function (data) {
                $scope.servicesalonbyidsalon = data; // response data
            }).error(function (response) {
                console.log('error message :',response);
            });
        }







        $scope.formData = {};

        $scope.save = function (da) {

          /*  if($scope.myagendas == null){
                $scope.saveService();
            }else {
                $scope.updateService();
            }*/

            angular.forEach(da, function(value, key) {
                angular.forEach(value, function(valu, ke) {

                    $scope.servicesalon =valu;
                    if(valu.time!=null && valu.price!=null && valu.employe!=null){

                      //  console.log(valu.idsalon);
                        console.log('name  '+valu.name)
                        $scope.existing(valu.name);

                        console.log($scope.servicesalonbyidsalon)
                        if($scope.servicesalonbyidsalon == null)
                        {
                           /**/
                            console.log("dosen't  exist in data base")
                        }else{
                            console.log('already exist in data base')
                        }


                    }else {
                        console.log('error')
                    }
                });

            });

          //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
          //  $location.url('/listsalonservice/'+id)
        };



        $scope.saveService=function(){

            $http.post('/gestionusers/servicesalon/', $scope.servicesalon)
                .success(function (response) {
                    //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
                    // $location.url('/service')
                    $scope.valuecheckbox[valu.name] =  "valider"
                    console.log('bieeeeeeeeeen')
                })
        }




















    }

})();
