(function () {

    angular
        .module('meanApp')
        .controller('addagendaCtrl', addagendaCtrl);

    addagendaCtrl.$inject = ['$scope', '$http', '$location', '$routeParams','$window','$interval'];
    function addagendaCtrl($scope, $http, $location, $routeParams,$window, $interval) {



        var id = $routeParams.idemploye;

        var iduser =$routeParams.iduser;


        $http({
            method: 'GET',
            url: '/gestionusers/employer/'+id
        }).success(function (data) {
            $scope.employe = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });



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

      //  $scope.showcrenaux(Date("2017-05-09T10:33:30.193+0000"),Date("2017-05-09T18:33:30.193+0000"),20)
        $http({
            method: 'GET',
            url: '/gestionusers/agendabyemploye/'+id
        }).success(function (data) {
            $scope.myagendas = data; // response data
          //  console.log(data.day[0].lundi)
           // console.log(JSON.stringify(data.day).lundi)
        }).error(function (response) {
            console.log('error message :',response);
        });

        var vm= this;

        vm.onSubmit = function () {
            $scope.saveAgenda();
     /*     if($scope.myagendas == null){
               $scope.saveAgenda();
           }else {
                   $scope.updateAgenda();
           }*/
        };

        $scope.updateAgenda =function updateAgenda(){
            console.log('ici update agenda')

            $http.put('/gestionusers/updateagendabyemploye/' + $scope.employe._id, $scope.agenda)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre agenda et Modifier avec success", "success");
                   $location.url('/bloquecreneauxagenda/'+id)
                })
        }


        $scope.saveAgenda = function saveAgenda() {
            console.log('ici save agenda')
            $scope.agenda.idemploye = $scope.employe._id;
            $scope.showcrenaux($scope.agenda.startTime,$scope.agenda.endTime,parseInt($scope.agenda.rate));

            console.log($scope.table)
                $scope.agenda.margetime=$scope.table;

            console.log($scope.agenda.margetime)



            $scope.weeks=['lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche'];
            angular.forEach($scope.weeks, function(value, key) {
                console.log(value)


                $interval($http.post('/gestionusers/agenda/'+value, $scope.agenda), 5000);
               $location.url('/agendasalon/'+iduser)
            })

        }


/*
 .success(function (response) {
 // sweetAlert("félicitation...", "votre agenda "+response.name +' à été ajoute avec succès', "success")
 //  $location.url('/employe/'+$scope.employe._id)


 })
 .error(function(err){
 //   alert(err);
 sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
 })
 */




    }

})();