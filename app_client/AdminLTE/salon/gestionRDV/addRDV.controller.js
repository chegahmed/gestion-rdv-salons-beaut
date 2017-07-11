(function () {

    angular
        .module('meanApp')
        .controller('addrdvCtrl', addrdvCtrl);

    addrdvCtrl.$inject = ['$scope', '$http','$location','$routeParams'];
    function addrdvCtrl($scope, $http ,$location, $routeParams) {



        var id = $routeParams.id;

//this for get profile salon
        $http({
            method: 'GET',
            url: '/gestionusers/getallsalonbyuser/'+id
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        //this for get all services by idsalon
        $http({
            method: 'GET',
            url: '/gestionusers/servicesalon/'
        }).success(function (data) {
            $scope.services = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


//this for get all employe by idsalon
        $http({
            method: 'GET',
            url: '/gestionusers/employer/'
        }).success(function (data) {
            $scope.employes= data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        var today =new Date();



//this method display creneaux when first loading or refreshing page
        $scope.getCalendar =function(idser){
            var i=0;
            $http({
                method: 'GET',
                url: '/gestionusers/service/'+idser
            }).success(function (data) {
                //console.log(JSON.stringify(data.data.rdvs[0].from.datetime))
                 $scope.s=data
            });


        }

















//this methods for Confirm RDV
        $scope.confirmRDV =function (rendezvous) {
            $http.put('/gestionusers/confirmrdv/' + rendezvous._id)
                .success(function (response) {
                    var index = $scope.rdvsnotconfirm.indexOf(rendezvous)
                    $scope.rdvsnotconfirm.splice(index, 1);
                    sweetAlert("félicitation...", "Votre RDV est confirmé avec succès", "success");
                })
        }









    }

})();


