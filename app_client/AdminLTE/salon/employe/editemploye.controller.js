(function () {

    angular
        .module('meanApp')
        .controller('editemployeCtrl', editemployeCtrl);

    editemployeCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editemployeCtrl($scope, $http, $location, $routeParams) {



        $scope.employe = {};
        var id = $routeParams.id;
        var employeId = $routeParams.employeId;



        $http({
            method: 'GET',
            url: '/gestionusers/employer/' + id
        }).success(function (data) {
            $scope.employe = data; // response data
        });

        $http({
            method: 'GET',
            url: '/gestionusers/getallsalonbyuser/'+employeId
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $scope.updateEmploye = function () {
            if($scope.employe.startTime >$scope.employe.startRepos || $scope.employe.endTime<$scope.employe.endRepos){
                sweetAlert("erreur...", "une erreur a été détecté veuillez verifier que votre repos et bien entre l'heure de commence et l'heure de terminée la journée !", "error");
            }else{
                $scope.showcrenaux($scope.employe.startTime,$scope.employe.endTime,parseInt($scope.employe.rate),$scope.employe.startRepos,$scope.employe.endRepos);
                $scope.employe.margetime=$scope.table;
                $http.put('/gestionusers/employer/' + $scope.employe._id, $scope.employe)
                    .success(function (response) {
                        sweetAlert("félicitation...", "Votre Employer et Modifier avec success", "success");
                        $location.url('/admin/employe/'+employeId)
                    })
            }
        }



        $scope.showcrenaux =function showcrenaux(start,end,rate,srepo,erepo){

            var hours = new Date(start).getHours();
            var minutes = new Date(start).getMinutes();


            var ehours = new Date(end).getHours();
            var eminutes = new Date(end).getMinutes();


            var srepos = new Date(srepo).getHours();
            var srminutes = new Date(srepo).getMinutes()


            var erepos = new Date(erepo).getHours();
            var erminutes = new Date(erepo).getMinutes();



            var r1 = ehours - hours;
            var r2 = eminutes>=minutes ?  minutes -eminutes : eminutes - minutes

            var  r = r1*60 +r2;

            var i=minutes;
            var k=minutes;
            var m=0;
            $scope.tab =[];
            var j=0;

            while(i<=r){

                if((srepos*60+srminutes)<=(hours*60+k)  & (hours*60+k)<(erepos*60+srminutes)){
                    $scope.tab.push({
                        value:false,
                        content : hours+' : '+k,
                        time:rate,
                        cause :'repos'
                    })
                }else{
                    $scope.tab.push({
                        value:true,
                        content : hours+' : '+k,
                        time:rate,
                        cause :'nothing'
                    })
                }



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
