(function () {

    angular
        .module('meanApp')
        .controller('addsalonserviceCtrl', addsalonserviceCtrl);

    addsalonserviceCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addsalonserviceCtrl($scope, $http, $location, $routeParams) {

        var id = $routeParams.id;

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

        // $scope.formData =   {"59318cb0efa50b137477a149":{"593936f34084d416e89ccd70":{"isChecked":true,"name":"Forfait Cils et Sourcils","categorie":"MAQUILLAGE --> Maquillage Jour","time":7,"price":7,"employe":[{"name":"aicha","idemploye":"59319498efa50b137477a14b","_id":"593937e04dc0a8095cfb740e"},{"name":"leila","idemploye":"59319505efa50b137477a1f4","_id":"593937e04dc0a8095cfb740d"}]}}};
        //   $scope.formData =   {"59318cb0efa50b137477a149":{"593936f34084d416e89ccd70":{"isChecked":true,"name":"Teinture Cils","categorie":"MAQUILLAGE --> Maquillage Jour","time":7,"price":7,"employe":[{"name":"aicha","idemploye":"59319498efa50b137477a14b","_id":"59393e1939c78a0958f87b23"}]}}};

        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgs = data; // response data
        });

        $http({
            method: 'GET',
            url: '/gestionusers/service'
        }).success(function (data) {
            $scope.services = data; // response data
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

        });

     //   $scope.formData = {};
  /*      $scope.formData = {
         "59318cb0efa50b137477a149": {//salon
         "59393272017165136464cd80": {//service
         isChecked: true,
         name: "teinture sourcils",
         categorie: "Maquillage --> Maquillage Soir",
         time: 2,
         price: 2,
         employe: [
            {
                "name" : "aicha",
                "idemploye" : ObjectId("59319498efa50b137477a14b"),
                "_id" : ObjectId("59393222017165136464cd7d")
            },
            {
                "name" : "leila",
                "idemploye" : ObjectId("59319505efa50b137477a1f4"),
                "_id" : ObjectId("59393222017165136464cd7c")
            }
        ]
         },
         },
         };
*/

        $scope.save = function (da) {



            angular.forEach(da, function (value, key) {
                angular.forEach(value, function (valu, ke) {

                   // valu.idservice = ke;
                  console.log(ke);
                    $scope.servicesalon = valu;
                    if (valu.time != null && valu.price != null && valu.employe != null) {

                        $scope.saveService(valu);

/*

                        $http({
                            method: 'GET',
                            url: '/gestionusers/servicesalonbyidsalon/' + valu.idsalon + '/' + valu.idservice
                        }).success(function (data) {
                            console.log(data)
                            if(data==null){
                                console.log('save here').
                               $scope.saveService(valu);
                            }else{

                               $scope.updateService(valu,data._id)
                            }
                        }).error(function (response) {
                            console.log('error message :', response);
                        });

*/


                    } else {
                        console.log('error')
                    }
                });

            });

            sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
            //  $location.url('/listsalonservice/'+id)
        };


        $scope.saveService = function saveService(value) {
            $http.post('/gestionusers/servicesalon/', value)
                .success(function (response) {
                    //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
                    // $location.url('/service')
                    $scope.valuecheckbox[valu.name] = "valider"

                })
        }


        $scope.updateService = function updateService(value,idserv) {
            $http.put('/gestionusers/servicesalon/'+idserv, value)
                .success(function (response) {
                    //  sweetAlert("félicitation...", "Votre service à été Ajouté avec success", "success");
                    // $location.url('/service')
                    $scope.valuecheckbox[valu.name] = "valider"

                })
        }


    }

})();