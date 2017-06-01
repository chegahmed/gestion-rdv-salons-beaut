(function () {

    angular
        .module('meanApp')
        .controller('bloquecreneauagendaCtrl', bloquecreneauagendaCtrl);

    bloquecreneauagendaCtrl.$inject = ['$scope', '$http', '$location', '$routeParams','$window'];
    function bloquecreneauagendaCtrl($scope, $http, $location, $routeParams,$window) {


        var id = $routeParams.idemploye;

///get employer by id and
        $http({
            method: 'GET',
            url: '/gestionusers/employer/'+id
        }).success(function (data) {
            $scope.employe = data; // response data


            $scope.agendaemploye=[]
            $scope.margeemploye=[]
            angular.forEach( $scope.employe.agenda,function (value,key) {
                angular.forEach( value.margetime,function (val,key) {

                    if(val.value == true){
                        $scope.margeemploye.push({
                            "value": false,
                            "content": val.content,
                            "cause": val.cause,
                            "_id": val._id
                        })
                    }
                })

                $scope.agendaemploye.push({
                    "day":value.day,
                    "_id":value._id,
                    "margetime":$scope.margeemploye
                })
                $scope.margeemploye=[]
            })

        }).error(function (response) {
            console.log('error message :',response);
        });




//here for filing array tab
        $scope.tab=[];
        $scope.FillingArray =function(idagenda,content,iditem,value,isChecked) {
          //  console.log(isChecked+" delete key  " + idagenda + " content " + content + "  iditem  " + iditem + "  succees " + value);

            if(isChecked==false){
                angular.forEach( $scope.tab,function (value,key) {
                   if( JSON.stringify(value) === JSON.stringify({
                           "idemploy":id,
                           "value" : false,
                           "content" : content,
                           "idagenda" : idagenda,
                           "iditem" :iditem
                       }) ){

                       $scope.tab.splice(key, 1)
                   }

                })
            }else if(isChecked==true){
                $scope.tab.push({
                    "idemploy":id,
                    "value" : false,
                    "content" : content,
                    "idagenda" : idagenda,
                    "iditem" :iditem
                })
            }

        }


        //here for  update all documment selected and existe in collection tab
        $scope.UpdateElement =function(){
            if($scope.cause== undefined){
                $scope.cause='repos'
            }
            angular.forEach( $scope.tab,function (value,key) {
             obj =  {
                    "value" :value.value,
                    "content" :value.content,
                    "cause" : $scope.cause
                }
                $http.put('/gestionusers/agendaemploye/' +id+'/'+value.idagenda+'/'+value.iditem, obj)
                    .success(function (response) {
                             sweetAlert("félicitation...", "les créneaux que vous avez sélectionné est bloqué avec succés", "success");
                        $window.location.reload();
                    })


            })

        }




///this function for selected all item by day
        $scope.toggleAll = function(day) {
            angular.forEach($scope.agendaemploye, function(itm){
                if(itm.day==day){
                    if(day=='lundi'){
                        var toggleStatus = $scope.isAllvaluelundi;
                    }else if(day=='mardi'){
                        var toggleStatus = $scope.isAllvaluemardi;
                    }else if(day=='mercredi'){
                        var toggleStatus = $scope.isAllvaluemercredi;
                    }else if(day=='jeudi'){
                        var toggleStatus = $scope.isAllvaluejeudi;
                    }else if(day=='vendredi'){
                        var toggleStatus = $scope.isAllvaluevendredi;
                    }else if(day=='samedi'){
                        var toggleStatus = $scope.isAllvaluesamedi;
                    }else if(day=='dimanche'){
                        var toggleStatus = $scope.isAllvaluedimanche;
                    }
                    angular.forEach(itm.margetime, function(value){
                        value.value = toggleStatus;
                        $scope.FillingArray(itm._id,value.content,value._id,value.value,value.value)

                    });
                }
            });
        }

        //this function for display  item checked
        $scope.optionToggled = function(day){

            angular.forEach($scope.agendaemploye, function(itm){
                if(itm.day==day){
                    if(day=='lundi'){
                        var toggleStatus = !$scope.isAllvaluelundi;
                        angular.forEach(itm.margetime, function(value){
                            $scope.isAllvaluelundi = value.every(function(item){ return item.value; })
                        });
                    }else if(day=='mardi'){
                        var toggleStatus = !$scope.isAllvaluemardi;
                        angular.forEach(itm.margetime, function(value){
                            $scope.isAllvaluemardi = value.every(function(item){ return item.value; })
                        });
                    }else if(day=='mercredi'){
                        var toggleStatus = !$scope.isAllvaluemercredi;
                        angular.forEach(itm.margetime, function(value){
                            $scope.isAllvaluemercredi = value.every(function(item){ return item.value; })
                        });
                    }else if(day=='jeudi'){
                        var toggleStatus = !$scope.isAllvaluejeudi;
                        angular.forEach(itm.margetime, function(value){
                            $scope.isAllvaluejeudi = value.every(function(item){ return item.value; })
                        });
                    }else if(day=='vendredi'){
                        var toggleStatus = !$scope.isAllvaluevendredii;
                        angular.forEach(itm.margetime, function(value){
                            $scope.isAllvaluevendredi = value.every(function(item){ return item.value; })
                        });
                    }else if(day=='samedi'){
                        var toggleStatus = !$scope.isAllvaluesamedi;
                        angular.forEach(itm.margetime, function(value){
                            $scope.isAllvaluesamedi = value.every(function(item){ return item.value; })
                        });
                    }else if(day=='dimanche'){
                        var toggleStatus = !$scope.isAllvaluedimanche;
                        angular.forEach(itm.margetime, function(value){
                            $scope.isAllvaluedimanche = value.every(function(item){ return item.value; })
                        });
                    }
                }
            });
        }
    }

})();