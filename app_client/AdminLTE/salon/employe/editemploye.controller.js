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
            url: '/gestionusers/getallmysalon/'+employeId
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        $scope.updateEmploye = function () {
            $scope.showcrenaux($scope.employe.startTime,$scope.employe.endTime,parseInt($scope.employe.rate));
            $scope.employe.margetime=$scope.table;
            $http.put('/gestionusers/employer/' + $scope.employe._id, $scope.employe)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre Employer et Modifier avec success", "success");
                    $location.url('/employe/'+employeId)
                })
        }



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
