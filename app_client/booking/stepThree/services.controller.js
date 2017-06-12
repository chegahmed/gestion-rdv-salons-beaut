/*

(function () {

    angular
        .module('userApp')
        .controller('rdvserviceCtrl', rdvserviceCtrl);

    rdvserviceCtrl.$inject = ['$scope', '$http','$location', '$routeParams'];
    function rdvserviceCtrl($scope, $http, $location ,$routeParams) {



        var idsalon = $routeParams.idsalon;


        ///this methode return all service by id salon
        $http({
            method: 'GET',
            url: 'routefrontoffice/rdvservice/' + idsalon
        }).success(function (data) {
            $scope.salonservices = data; // response data
            $scope.valueselected=$scope.salonservices

            console.log(JSON.stringify(data))
        });


        $scope.dateForRDV  = function (service) {
            /!*$scope.dateChoisi =date
            console.log($scope.dateChoisi)*!/
            console.log(service)
        };

        ///this methode return category and sub-category by id salon
        $http({
            method: 'GET',
            url: '/routefrontoffice/rdvcatg/' + idsalon
        }).success(function (data) {
            $scope.AllCatg = data; // response data
              // console.log(data)
        });


        ///get employe by id
        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.empl = data; // response data
            // console.log(data)
        });


       ///this methode for To filling table with the objects specified by the service name
        $scope.DisplayValue=function(selectedValue){
           $scope.myarray= $scope.salonservices;
           $scope.valueselected=[];
       angular.forEach($scope.myarray,function (value,key) {
           var str =value.categorie;
           var sc=str.split(" --> ");
           if(sc[1] == selectedValue){
               $scope.valueselected.push(value)
           }
           })
        }

//here for filing array tab
        $scope.tab=[];
        $scope.FillingArray =function(service,isChecked,employe) {
           console.log(service.employe)
            if(isChecked==false){
                angular.forEach( $scope.tab,function (value,key) {
                    if( JSON.stringify(value) === JSON.stringify(service) ){
                        $scope.tab.splice(key, 1)
                    }
                })
            }else if(isChecked==true){
                service.employe=[]
                service.employe.push(employe)
                $scope.tab.push(service)
            }
        }



        $scope.NextPage =function(){
            $scope.page1=false;
            $scope.page2=true;
        }
        $scope.BackPage =function(){
            $scope.page1=true;
            $scope.page2=false;
        }
        $scope.page1=true;
        $scope.page2=false;




    $scope.register=function(){
        $scope.client.type='register';
        $http.post('/routefrontoffice/registerclient', $scope.client)
            .error(function(err){
                alert(err);
            })
            .then(function(data) {
                $("#msg-reg").text(data.data.msg);
            });
        }


        $scope.disprdv=true;
        $scope.ChercherRDV = function(date) {
            $scope.disprdv=false;
//console.log(date)
/!*console.log(JSON.stringify($scope.tab))
              angular.forEach( $scope.tab,function (item,key) {*!/


            $http({
                method: 'GET',
                url: 'routefrontoffice/chercherrdv/' + date                     // item.idemploye/...
            }).success(function (data) {
                $scope.resSearch = data.data.rdvs[0];
                console.log(JSON.stringify($scope.resSearch))
            });


           //  })

        }


        $scope.ChercherRDVSuivant = function(date) {

            console.log("ici date" +date)
            var date2 = (date+5*60)*1000;
            $scope.ChercherRDV(new Date(date2),);
        }



        $scope.ConfirmRDV = function() {
            $scope.btnrdvsuiv=true;
            $scope.ArrayConfirmRDV.push({
              /!*  "service" :,
                "price" :,
                "date" : ,
                "time" : ,
                "idemploye" :,
                "idresponsable" :*!/
            })

            $scope.msg="votre RDV et Bien Confirmé"
        }



    }
})();*/
