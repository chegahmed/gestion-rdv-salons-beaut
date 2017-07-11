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



           // $scope.showcrenaux($scope.employe.startTime,$scope.employe.endTime,parseInt($scope.employe.rate),$scope.employe.startRepos,$scope.employe.endRepos);


                       if($scope.employe.startTime >$scope.employe.startRepos || $scope.employe.endTime<$scope.employe.endRepos){
                           sweetAlert("erreur...", "une erreur a été détecté veuillez verifier que votre repos et bien entre l'heure de commence et l'heure de terminée la journée !", "error");
                       }else{


                           $scope.employe.idresponsable = $scope.profile._id;

                           $scope.showcrenaux($scope.employe.startTime,$scope.employe.endTime,parseInt($scope.employe.rate),$scope.employe.startRepos,$scope.employe.endRepos);


                                   $scope.employe.margetime=$scope.table;
                            $http.post('/gestionusers/employer/', $scope.employe)
                            .success(function (response) {
                            sweetAlert("félicitation...", "votre employe "+response.name +' a été ajoute avec succès', "success")
                            $location.url('/admin/employe/'+$scope.profile._id)
                            })
                            .error(function(err){
                            //   alert(err);
                            sweetAlert("erreur...", "une erreur a été détecté veuillez verifier votre formulaire !", "error");
                            })

                       }



        };


    /*    $scope.showcrenaux =function showcrenaux(start,end,rate,srepo,erepo){

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
            var n='0';
            var d=0;
            var f=0;

            while(i<=r){
                if(k<10){
                    n+=k
                    console.log(hours+' : '+n)
                    n='0'
                }else{
                    console.log(hours+' : '+k)
                }


                $scope.tab.push({
                    value:true,
                    content : hours+' : '+k,
                    cause :'nothing'
                })

                if(rate>60){
                    d= rate%60;
                    j++;
                    i+=rate;
                    f=Math.trunc(rate/60)
                    k+=d;
                   // if(k>59){
                        m=k-60;
                        k=m;
                        m=0;
                        hours +=f+1;
                   // }

                }else{
                    j++;
                    i+=rate;
                }


             /!*   j++;
                i+=rate;

                k+=rate;
                if(k>59){
                    m=k-60;
                    k=m;
                    m=0;
                    hours ++;
                }*!/
            }

               console.log(JSON.stringify($scope.tab))
            $scope.table = $scope.tab;
        }
*/




                $scope.showcrenaux =function showcrenaux(start,end,rate,srepo,erepo){

                    var hours = new Date(start).getHours();
                    var minutes = new Date(start).getMinutes();


                    var ehours = new Date(end).getHours();
                    var eminutes = new Date(end).getMinutes();


                    var srepos = new Date(srepo).getHours();
                    var srminutes = new Date(srepo).getMinutes()
                    console.log('srepos '+srepos)

                    var erepos = new Date(erepo).getHours();
                    var erminutes = new Date(erepo).getMinutes();
                    console.log('erepos '+erepos)


                    var r1 = ehours - hours;
                    var r2 = eminutes>=minutes ?  minutes -eminutes : eminutes - minutes

                    var  r = r1*60 +r2;

                    var i=minutes;
                    var k=minutes;
                    var m=0;
                    $scope.tab =[];
                    var j=0;
                    var n='0';
                    var d=0;
                    var f=0;



                    while(i<=r){

                      /*  if(k<10){
                            n+=k
                            console.log(hours+' : '+n)
                            n='0'
                        }else{
                            console.log(hours+' : '+k)
                        }*/

        if((srepos*60+srminutes)<=(hours*60+k)  & (hours*60+k)<(erepos*60+srminutes)){

            if(k<10){
                n+=k
                $scope.tab.push({
                    value:false,
                    content : hours+' : '+n,
                    time:rate,
                    cause :'repos'
                })
              //  console.log(hours+' : '+n)
                n='0'
            }else{
              //  console.log(hours+' : '+k)
                $scope.tab.push({
                    value:false,
                    content : hours+' : '+k,
                    time:rate,
                    cause :'repos'
                })
            }
           // console.log(hours+' : '+k   +'  repos '+srepos +' '+ erepos)

        }else{

            if(k<10){
                n+=k
                $scope.tab.push({
                    value:true,
                    content : hours+' : '+n,
                    time:rate,
                    cause :'nothing'
                })
              //  console.log(hours+' : '+n)
                n='0'
            }else{
               // console.log(hours+' : '+k)
                $scope.tab.push({
                    value:true,
                    content : hours+' : '+k,
                    time:rate,
                    cause :'nothing'
                })
            }


           // console.log(hours+' : '+k + '    nothing')

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

                    console.log(JSON.stringify($scope.tab))
                    $scope.table = $scope.tab;
                }




    }

})();
