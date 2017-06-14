
(function () {

    angular
        .module('userApp')
        .controller('rdvconfirmCtrl', rdvconfirmCtrl);

    rdvconfirmCtrl.$inject = ['$scope', '$http','$location','$routeParams','$localStorage'];
    function rdvconfirmCtrl($scope, $http, $location ,$routeParams,$localStorage) {


        $scope.selectedServices= $localStorage.listservices;

        var today =new Date();


        $scope.getCalendar =function(){
            var i=0;
            angular.forEach( $scope.selectedServices,function (s) {
                $scope.resSearch=[];
                $scope.dateSelected=[];
                $http({
                    method: 'GET',
                    url: 'routefrontoffice/chercherrdv/date=' + today+'&idemp='+  s.employe                   // item.idemploye/...
                }).success(function (data) {
                    $scope.resSearch[s._id] = data.data.rdvs[0];
                    $scope.dateSelected[s._id] = data.data.rdvs[0][0]
                });
            })
        }

        $scope.getCalendar();

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





        ////this function fot selectedd crenaux and confirmer

        $scope.AddRdv =function (s ,crenaux) {
            $scope.tablecrenauxselected.push(crenaux);

            angular.forEach( $scope.selectedServices,function (s) {
            angular.forEach( $scope.resSearch[s._id],function (c,key) {
                if(c.from.datetime.toFixed(0)==crenaux.from.datetime.toFixed(0) && c.empId==crenaux.empId){
                    $scope.resSearch[s._id].splice(key, 1)
                    console.log(c)
                }
            });
            });
            var serviceId = s._id;
            var empId =s.employe;




        }










        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.employes = data; // response data
        })


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