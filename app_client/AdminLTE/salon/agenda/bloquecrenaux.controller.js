(function () {

    angular
        .module('meanApp')
        .controller('bloquecreneauagendaCtrl', bloquecreneauagendaCtrl);

    bloquecreneauagendaCtrl.$inject = ['$scope', '$http', '$location', '$routeParams','$window'];
    function bloquecreneauagendaCtrl($scope, $http, $location, $routeParams,$window) {


        var id = $routeParams.idemploye;


        $http({
            method: 'GET',
            url: '/gestionusers/employer/'+id
        }).success(function (data) {
            $scope.employe = data; // response data
          // console.log(JSON.stringify($scope.employe))
        }).error(function (response) {
            console.log('error message :',response);
        });


        $scope.tab=[];
        $scope.FillingArray =function(idagenda,content,iditem,value,isChecked) {
            console.log(isChecked+" delete key  " + idagenda + " content " + content + "  iditem  " + iditem + "  succees " + value);

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

            console.log(JSON.stringify(obj))

                $http.put('/gestionusers/agendaemploye/' +id+'/'+value.idagenda+'/'+value.iditem, obj)
                    .success(function (response) {
                      //  $scope.message=content+" a été bloque avec success";
                             sweetAlert("félicitation...", "les créneaux que vous avez sélectionné est bloqué avec succés", "success");
                        $window.location.reload();
                    })


            })

        }

/*
        $scope.UpdateElement =function(idagenda,content,iditem,value){
            console.log(" delete key  "+idagenda+" content "+content+ "  iditem  "+ iditem+ "  succees "+value);
     /!*     $scope.tab=[];
            $scope.tab.push({
                "value" : false,
                "content" : content,
                "_id" : iditem
            })

            //console.log(JSON.stringify($scope.tab))

            $http.put('/gestionusers/agenda/' +idagenda+'/'+iditem, $scope.tab)
                .success(function (response) {
                   $scope.message=content+" a été bloque avec success";
               /!*      sweetAlert("félicitation...", "Votre agenda et Modifier avec success", "success");
                    $window.location.reload();*!/
                })*!/

        }*/













    }

})();