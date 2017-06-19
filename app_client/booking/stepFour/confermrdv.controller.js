
(function () {

    angular
        .module('userApp')
        .controller('rdvconfirmCtrl', rdvconfirmCtrl);

    rdvconfirmCtrl.$inject = ['$scope', '$http','$location','$routeParams','$sessionStorage','$timeout'];
    function rdvconfirmCtrl($scope, $http, $location ,$routeParams,$sessionStorage, $timeout) {


        $scope.selectedServices= $sessionStorage.listservices;

        var today =new Date();



//this method display creneaux when first loading or refreshing page
        $scope.getCalendar =function(){
            var i=0;
            angular.forEach( $scope.selectedServices,function (s) {
                $scope.resSearch=[];
                $scope.dateSelected=[];
                $scope.emplo=[];
                $scope.tabemp=[]
                $http({
                    method: 'GET',
                    url: 'routefrontoffice/chercherrdv/date=' + today+'&idemp='+  s.employe                   // item.idemploye/...
                }).success(function (data) {
                    $scope.resSearch[s._id] = data.data.rdvs[0];
                    $scope.dateSelected[s._id] = data.data.rdvs[0][0]
                });


                $http({
                    method: 'GET',
                    url: '/gestionusers/servicesalon/'+s._id
                }).success(function (data) {
                    angular.forEach(data.employe,function (c) {
                        $scope.tabemp.push(c);
                    })
                    $scope.emplo[s._id]=$scope.tabemp;
                    $scope.tabemp=[];
                })
            })
        }

        $scope.getCalendar();


        //this function for increment to next day
        $scope.tablecrenauxselected =[]
        $scope.CrenauxNextDay =function(serviceId,empId,datetime){
            var date =new Date(datetime*1000);
            var nextdate =new Date();
             nextdate.setDate(date.getDate()+1);
            nextdate.setHours(5);

            $http({
                method: 'GET',
                url: 'routefrontoffice/chercherrdv/date=' + nextdate+'&idemp='+  empId                   // item.idemploye/...
            }).success(function (data) {
                $scope.resSearch[serviceId] = data.data.rdvs[0];
                $scope.dateSelected[serviceId] = data.data.rdvs[0][0]


                angular.forEach($scope.resSearch[serviceId],function (s,key) {
                    angular.forEach($scope.tablecrenauxselected,function (c) {
                        if(c.from.datetime.toFixed(0)==s.from.datetime.toFixed(0) && c.empId==s.empId){
                            $scope.resSearch[serviceId].splice(key, 1)
                        }
                    })
                });
            });
        }



        //this function for back to previous day
        $scope.CrenauxPreviousDay =function(serviceId,empId,datetime){
            var date =new Date(datetime*1000);
            var nextdate =new Date();
             nextdate.setDate(date.getDate()-1);
            nextdate.setHours(5);

            $http({
                method: 'GET',
                url: 'routefrontoffice/chercherrdv/date=' + nextdate+'&idemp='+  empId                   // item.idemploye/...
            }).success(function (data) {
                $scope.resSearch[serviceId] = data.data.rdvs[0];
                $scope.dateSelected[serviceId] = data.data.rdvs[0][0];

                angular.forEach($scope.resSearch[serviceId],function (s,key) {
                    angular.forEach($scope.tablecrenauxselected,function (c) {
                        if(c.from.datetime.toFixed(0)==s.from.datetime.toFixed(0) && c.empId==s.empId){
                            $scope.resSearch[serviceId].splice(key, 1)
                        }
                    })
                });
            });
        }




        $scope.ChercheCrenaux= function (service) {

            var date =new Date();

            $http({
                method: 'GET',
                url: 'routefrontoffice/chercherrdv/date=' + date+'&idemp='+  service.employe                   // item.idemploye/...
            }).success(function (data) {
                $scope.resSearch[service._id] = data.data.rdvs[0];
                $scope.dateSelected[service._id] = data.data.rdvs[0][0]


                angular.forEach($scope.resSearch[service._id],function (s,key) {
                    angular.forEach($scope.tablecrenauxselected,function (c) {
                        if(c.from.datetime.toFixed(0)==s.from.datetime.toFixed(0) && c.empId==s.empId){
                            $scope.resSearch[service._id].splice(key, 1)
                        }
                    })
                });
            });
        }


        $scope.ExistDeja =function (s ,crenaux) {
            var res = false;
            angular.forEach($scope.tablecrenauxselected,function (t,key) {

                if(t.idservice == s._id ){
                    res = true;
                }else{
                    res= false;
                }
            })
            return res;
        }


        ////this function fot selectedd crenaux and confirmer
        $scope.AddRdv =function (s ,crenaux) {
            console.log('tableau :',$scope.tablecrenauxselected)

            console.log($scope.tablecrenauxselected.length)
            var tablength =$scope.tablecrenauxselected.length;

            if(tablength<1){
                $scope.tablecrenauxselected.push({
                    "idservice":s._id,
                    "crenaux":crenaux
                });
            }

          var result =  $scope.ExistDeja(s ,crenaux)
            console.log(result);
            if(result == false){
                $scope.tablecrenauxselected.push({
                    "idservice":s._id,
                    "crenaux":crenaux
                });
            }else {
                angular.forEach($scope.tablecrenauxselected,function (t,key) {
                    console.log('id : ',t.idservice)

                    if(t.idservice == s._id ){
                        $scope.tablecrenauxselected.splice(key, 1)
                        $scope.tablecrenauxselected.push({
                            "idservice":s._id,
                            "crenaux":crenaux
                        });
                    }
                })
            }

         /*    angular.forEach($scope.tablecrenauxselected,function (t,key) {

             if(t.idservice == s._id){
             $scope.tablecrenauxselected.splice(key, 1)
             $scope.tablecrenauxselected.push({
             "idservice":s._id,
             "crenaux":crenaux
             });
             }else{
                 $scope.tablecrenauxselected.push({
                     "idservice":s._id,
                     "crenaux":crenaux
                 });
             }
             })*/



       /*     angular.forEach( $scope.selectedServices,function (s) {
            angular.forEach( $scope.resSearch[s._id],function (c,key) {
                if(c.from.datetime.toFixed(0)==crenaux.from.datetime.toFixed(0) && c.empId==crenaux.empId){
                    $scope.resSearch[s._id].splice(key, 1)
                    console.log(c)
                }
            });
            });


        else if(key=tablength && t.idservice != s._id){
        console.log('enter')
        $scope.tablecrenauxselected.push({
        "idservice":s._id,
        "crenaux":crenaux
        });
        }
            */

        }


        $http({
            method: 'GET',
            url: '/gestionusers/servicesalon/'
        }).success(function (data) {
          $scope.servicessalon =data;
        })

        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.employes = data; // response data
        })



    
        ///function for send email
        $scope.register=function(){




            angular.forEach($scope.tablecrenauxselected,function (t,key) {
                var date =new Date(t.crenaux.from.datetime*1000)
                angular.forEach($scope.selectedServices,function (service,ke) {
                    if(service._id==t.idservice){
                        $scope.client.type = "register";
                        $scope.client.idservice = t.idservice;
                        $scope.client.service = service.name;
                        $scope.client.price = parseInt(service.price);
                        $scope.client.date = date;
                        $scope.client.datetime =t.crenaux.from.datetime ;
                        $scope.client.time =parseInt(service.time) ;
                        $scope.client.idemploye =t.crenaux.empId ;

                        $timeout(function() {
                            getName().then(function(name) {
                                $scope.name = "Hello " + name;
                            });
                        }, 1000);

                        console.log('idservice '+t.idservice)
                        console.log('datetime '+t.crenaux.from.datetime)
                        console.log('date '+date)
                        console.log('employe '+t.crenaux.empId)
                        console.log('price '+service.price)
                        console.log('time '+service.time)
                        console.log('service '+service.name)
                        console.log('------------------------------ '+key)


                     //   $scope.client.type = "register";
                        $http.post('/routefrontoffice/registerclient/idservice='+t.idservice+'&service='+service.name+'&price='+service.price+'&date='+date+'&datetime='+t.crenaux.from.datetime+'&time='+service.time+'&idemploye='+t.crenaux.empId,  $scope.client)
                            .success(function (response) {
                                sweetAlert("félicitation...", "Votre client à été Ajouté avec success", "success");
                                //  $location.url('/admin/service')
                            })

                    }
                })
            });




           /* if( $scope.client.email==null){
                sweetAlert("erreur...", "l'un des  champs de votre formulaire est vide!", "error");

            }else {*/
       /*    $scope.client.type = "register";
                $http.post('/routefrontoffice/registerclient/',  $scope.client)
                    .success(function (response) {
                        sweetAlert("félicitation...", "Votre client à été Ajouté avec success", "success");
                      //  $location.url('/admin/service')
                    })
                    .error(function(err){
                        alert(err);
                    })
                    .then(function(){
                     //   $location.path('/admin/service');
                    });*/

          //  };
            
            console.log('here function register')
           /* console.log($scope.client)
            console.log($scope.client.firstname+' '+$scope.client.lastname+' '+$scope.client.email)*/
        }


















   //this function for search RDV
        $scope.disprdv=true;
        $scope.ChercherRDV = function(date,service) {
            $scope.disprdv=false;
            $scope.resSearch=[];

            $http({
                method: 'GET',
                url: 'routefrontoffice/chercherrdv/' + date                     // item.idemploye/...
            }).success(function (data) {
                $scope.resSearch[service._id] = data.data.rdvs[0];
             //   console.log(JSON.stringify($scope.resSearch[service._id]))
            });
        }

   // this function for  search next RDV
        $scope.ChercherRDVSuivant = function(date ,service) {
            var date2 = (date+5*60)*1000;
            $scope.ChercherRDV(new Date(date2),service);
        }



    }
})();