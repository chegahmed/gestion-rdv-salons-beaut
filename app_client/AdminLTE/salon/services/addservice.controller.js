(function () {

    angular
        .module('meanApp')
        .controller('addsalonserviceCtrl', addsalonserviceCtrl);

    addsalonserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addsalonserviceCtrl($scope, $http, $location, $routeParams) {

        var id = $routeParams.id;
console.log('idsalon '+id)

        $http({
            method: 'GET',
            url: '/gestionusers/' + id
        }).success(function (data) {
            $scope.profile = data; // response data
        }).error(function (response) {
            console.log('error message :', response);
        });


        $http({
            method: 'GET',
            url: '/gestionusers/getallmysalon/' + id
        }).success(function (data) {
            $scope.formData = data.servicesalons; // response data
            $scope.salons = data.salons; // response data
        }).error(function (response) {
            console.log('error message :', response);
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
            url: '/gestionusers/allemployer/' + id
        }).success(function (data) {
            $scope.employes = data; // response data
        }).error(function (response) {
            console.log('error message :', response);
        });

        $scope.existing = function (name) {
            $http({
                method: 'GET',
                url: '/gestionusers/servicesalonbyidsalon/' + id + '/' + name
            }).success(function (data) {
                $scope.servicesalonbyidsalon = data; // response data
            }).error(function (response) {
                console.log('error message :', response);
            });
        }


        $http({
            method: 'GET',
            url: '/gestionusers/servicesalon'
        }).success(function (data) {
            $scope.service_salon = data; // response data
         /*   console.log('ici tableaux services')
            console.log(data)*/

        });

        $scope.formData = {};
        /*$scope.formData = {
         "5900bd96a3d5fa05d4dc5b26": {//salon
         "5900b3ab81126113201f35bb": {//service
         isChecked: true,
         name: "teinture sourcils",
         categorie: "Maquillage --> Maquillage Soir",
         time: 2,
         price: 2,
         employe: [
         "aicha",
         ]
         },
         },
         };*/


        $scope.save = function (da) {

            /*  if($scope.myagendas == null){
             $scope.saveService();
             }else {
             $scope.updateService();
             }*/

            angular.forEach(da, function (value, key) {
                angular.forEach(value, function (valu, ke) {
                    valu.idservice = ke;
            //        console.log(ke);
                    $scope.servicesalon = valu;
                    if (valu.time != null && valu.price != null && valu.employe != null) {
                        $http({
                            method: 'GET',
                            url: '/gestionusers/servicesalonbyidsalon/' + valu.idsalon + '/' + valu.idservice
                        }).success(function (data) {
                            if(JSON.stringify(data)=='[]'){
                                console.log('save here')
                                $scope.saveService(valu);
                            }else{
                               // console.log(JSON.stringify(valu))
                               // console.log(JSON.stringify(data))
                               //console.log(data._id)
                               $scope.updateService(valu,data._id)
                             //   console.log(JSON.stringify(data))
                            }
                        }).error(function (response) {
                            console.log('error message :', response);
                        });





                    } else {
                        console.log('error')
                    }
                });

            });

            sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
            //  $location.url('/listsalonservice/'+id)
        };


        $scope.saveService = function saveService(value,idserv) {
          //  console.log('bieeeeeeeeeen')
            $http.post('/gestionusers/servicesalon/', value)
                .success(function (response) {
                    //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
                    // $location.url('/service')
                    $scope.valuecheckbox[valu.name] = "valider"

                })
        }


        $scope.updateService = function updateService(value,idserv) {
            //  console.log('bieeeeeeeeeen')
            $http.put('/gestionusers/servicesalon/'+idserv, value)
                .success(function (response) {
                    //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
                    // $location.url('/service')
                    $scope.valuecheckbox[valu.name] = "valider"

                })
        }


    }

})();