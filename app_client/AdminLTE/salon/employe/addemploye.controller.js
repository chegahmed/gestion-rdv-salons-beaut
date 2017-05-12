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
            url: '/gestionusers/getallmysalon/'+id
        }).success(function (data) {
            $scope.salons = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });



        var vm = this;

        vm.onSubmit = function () {
            $scope.employe.idresponsable = $scope.profile._id;
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




        $scope.saveAgenda = function saveAgenda() {
            $scope.agenda.idemploye = $scope.employe._id;
            $scope.showcrenaux($scope.employe.startTime,$scope.employe.endTime,parseInt($scope.employe.rate));

            console.log($scope.table)
            $scope.employe.margetime=$scope.table;

            console.log($scope.agenda.margetime)



            $scope.weeks=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
            angular.forEach($scope.weeks, function(value, key) {
                console.log(value)


             $http.post('/gestionusers/agenda/'+value, $scope.agenda)
                $location.url('/agendasalon/'+id)
            })

        }



        $scope.showcrenaux =function showcrenaux(start,end,rate){

            var hours = new Date(start).getHours();
            var minutes = new Date(start).getMinutes();
            /* var ampm = hours >= 12 ? 'PM' : 'AM';
             hours = hours % 12;
             hours = hours ? hours : 12; // the hour '0' should be '12'
             minutes = minutes < 10 ? '0' + minutes : minutes;
             var strTime = hours + ':' + minutes + ' ' + ampm;*/



            var ehours = new Date(end).getHours();
            var eminutes = new Date(end).getMinutes();
            /*  var eampm = ehours >= 12 ? 'PM' : 'AM';
             ehours = ehours % 12;
             ehours = ehours ? ehours : 12; // the hour '0' should be '12'
             eminutes = eminutes < 10 ? '0' + eminutes : eminutes;
             var estrTime = ehours + ':' + eminutes + ' ' + eampm;*/


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
                    content : hours+' : '+k
                })
                j++;
                /* console.log(JSON.stringify($scope.tab))
                 console.log(j)*/
                /*  tab[j][content]= hours+' : '+k
                 console.log(tab[j][content]);
                 console.log(j)
                 j++;*/

                i+=rate;

                k+=rate;
                if(k>59){
                    m=k-60;
                    k=m;
                    m=0;
                    hours ++;
                }

                // console.log('i = '+i);
            }

            $scope.table = $scope.tab;
        }



    }

})();
