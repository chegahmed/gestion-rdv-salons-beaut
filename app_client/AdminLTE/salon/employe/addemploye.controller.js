/**
 * Created by ahmed on 20/04/2017.
 */
(function () {

    angular
        .module('meanApp')
        .controller('addemployeCtrl', addemployeCtrl);

    addemployeCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function addemployeCtrl($scope, $http, $location, $routeParams) {



        var id = $routeParams.id;

        $scope.idresponsable =id;
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
            url: '/gestionusers/getallsalonbyuser/'+id
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });



        var vm = this;

        vm.onSubmit = function () {
            $scope.employe.idresponsable = $scope.profile._id;

            $scope.showcrenaux($scope.employe.startTime,$scope.employe.endTime,parseInt($scope.employe.rate));
            $scope.employe.margetime=$scope.table;
            $http.post('/gestionusers/employer/', $scope.employe)
                .success(function (response) {
                    sweetAlert("félicitation...", "votre employe "+response.name +' a été ajoute avec succès', "success")
                    $location.url('/employe/'+$scope.profile._id)
                })
                .error(function(err){
                 //   alert(err);
                    sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                })

        };



        $scope.showcrenaux =function showcrenaux(start,end,rate){

            var hours = new Date(start).getHours();
            var minutes = new Date(start).getMinutes();


            var ehours = new Date(end).getHours();
            var eminutes = new Date(end).getMinutes();



            var r1 = ehours - hours;
            var r2 = eminutes>=minutes ?  minutes -eminutes : eminutes - minutes

            var  r = r1*60 +r2;

            var i=minutes;
            var k=minutes;
            var m=0;
            $scope.tab =[];
            var j=0;

            while(i<=r){
                $scope.tab.push({
                    value:true,
                    content : hours+' : '+k,
                    cause :'nothing'
                })
                j++;
                i+=rate;

                k+=rate;
                if(k>59){
                    m=k-60;
                    k=m;
                    m=0;
                    hours ++;
                }
            }

            $scope.table = $scope.tab;
        }

    }

})();
