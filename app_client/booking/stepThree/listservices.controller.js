
(function () {

    angular
        .module('userApp')
        .controller('rdvservicesCtrl', rdvservicesCtrl);

    rdvservicesCtrl.$inject = ['$scope', '$http','$window','$location', '$routeParams','$localStorage'];
    function rdvservicesCtrl($scope, $http,$window, $location ,$routeParams,$localStorage) {

        var idsalon = $routeParams.idsalon;
        var namescatg = $routeParams.namescatg;






        ///this methode return category and sub-category by id salon
        $http({
            method: 'GET',
            url: '/gestionusers/salon/' + idsalon
        }).success(function (data) {
            $scope.salon = data; // response data
        });




        ///this methode return category and sub-category by id salon
        $http({
            method: 'GET',
            url: '/routefrontoffice/rdvcatg/' + idsalon
        }).success(function (data) {
            $scope.AllCatg = data; // response data
        });


        ///this methode return all service by id salon
        $http({
            method: 'GET',
            url: 'routefrontoffice/rdvservice/' + idsalon
        }).success(function (data) {
            $scope.salonservices = data; // response data
            $scope.initDisplayService($scope.salonservices[0].categorie);
        });



        $scope.initDisplayService =function (scateg) {
            var sca =scateg.split(" --> ");
            $scope.services=[];
            angular.forEach($scope.salonservices,function (s) {
                var str =s.categorie;
                var sc=str.split(" --> ");

                if(sc[1] == sca[1]){
                    $scope.services.push(s)
                }
            })
        }



        $scope.DisplayService=function (scateg) {

            $scope.services=[];
            angular.forEach($scope.salonservices,function (s) {
                var str =s.categorie;
                var sc=str.split(" --> ");
                if(sc[1] == scateg){
                    $scope.services.push(s)
                }
            })
        }





        ///this function for stor $scope.tab in session and passing a next page
        $scope.Addsession =function () {

            $localStorage.listservices =$scope.tab;

            $location.path('/rdvconfirmer')
        }






        $scope.iconadd =[]
        $scope.hideimgadd =[]
        $scope.hideimgsuccess =[]
        $scope.tab=[];
        $scope.AddServices =function(service){
           var  idservice =service._id;

            if($scope.hideimgadd[idservice]){
                $scope.hideimgadd[idservice] =false
                $scope.hideimgsuccess[idservice] =true
                $scope.iconadd[idservice] ="designeFrontoffice/images/add.png"

                angular.forEach( $scope.tab,function (value,key) {
                    if( JSON.stringify(value) == JSON.stringify(service) ){
                        $scope.tab.splice(key, 1)
                        $scope.notificationMsg = 'Vous pouvez ajouter des services ou continuer';
                    }
                })

            }else{
                $scope.hideimgadd[idservice] =true
                $scope.hideimgsuccess[idservice] =false
                $scope.iconadd[idservice] ="designeFrontoffice/images/success.png"
                $scope.tab.push(service)
               $scope.notificationMsg = $scope.tab.length+ ' services ' +service.price +' Dh';

            }
        }


    }
})();