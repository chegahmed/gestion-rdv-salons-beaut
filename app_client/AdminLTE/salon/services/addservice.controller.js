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

   /*     $scope.formData = {};
        $scope.formData =  { "59318cb0efa50b137477a149":
        { "5931827befa50b137477a136":
        { isChecked: true,
            name: 'Teinture Cils',
            categorie: 'MAQUILLAGE --> Maquillage Jour',
            time: 8,
            price: 8,
            },
            '5931828defa50b137477a137':
            { isChecked: true,
                name: 'Forfait Cils et Sourcils',
                categorie: 'MAQUILLAGE --> Maquillage Jour',
                time: 5,
                price: 15,
                } }}*/


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

                        $scope.updtser==false;
                        angular.forEach( $scope.service_salon,function (s) {
                            console.log('idsalon ' + s.idsalon +' idservice ' + s.idservice)
                            if( s.idsalon == valu.idsalon && s.idservice == valu.idservice){
                                $scope.updateService(valu,s._id)
                                $scope.updtser==true;

                            }
                        })
                        console.log($scope.updtser)
                        if($scope.updtser == false){
                            $scope.saveService(valu);
                        }




                       /* $http({
                            method: 'GET',
                            url: '/gestionusers/servicesalonbyidsalon/' + valu.idsalon + '/' + valu.idservice
                        }).success(function (data) {
                            console.log(valu)
                            $scope.updateService(valu,data._id)


                          /!*  if(data=null){
                               // console.log('save here')
                                $scope.saveService(valu);
                            }else{
                                $scope.updateService(valu,data._id)
                            }*!/
                        }).error(function (response) {
                            console.log('error message :', response);
                        });*/



                    } else {
                        console.log('error')
                    }
                });

            });

            sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
            //  $location.url('/listsalonservice/'+id)
        };


        $scope.saveService = function saveService(value) {
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