(function () {

    angular
        .module('meanApp')
        .controller('bloquecreneauagendaCtrl', bloquecreneauagendaCtrl);

    bloquecreneauagendaCtrl.$inject = ['$scope', '$http', '$location', '$routeParams','$window'];
    function bloquecreneauagendaCtrl($scope, $http, $location, $routeParams,$window) {


        var id = $routeParams.idemploye;


        $http({
            method: 'GET',
            url: '/gestionusers/agendabyemploye/'+id
        }).success(function (data) {
            $scope.agendas = data; // response data
          //  console.log(JSON.stringify($scope.allagenda))
        }).error(function (response) {
            console.log('error message :',response);
        });


        $scope.UpdateElement =function(idagenda,content,iditem,value){
            console.log(" delete key  "+idagenda+" content "+content+ "  iditem  "+ iditem+ "  succees "+value);
          $scope.tab=[];
            $scope.tab.push({
                "value" : false,
                "content" : content,
                "_id" : iditem
            })

            //console.log(JSON.stringify($scope.tab))

            $http.put('/gestionusers/agenda/' +idagenda+'/'+iditem, $scope.tab)
                .success(function (response) {
console.log(response)
                   $scope.message=content+" a été bloque avec success";
               /*      sweetAlert("félicitation...", "Votre agenda et Modifier avec success", "success");
                    $window.location.reload();*/
                })
          //  $location.url('/bloquecreneauxagenda/'+idempl)
        }













    }

})();