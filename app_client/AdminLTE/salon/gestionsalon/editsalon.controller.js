(function () {

    angular
        .module('meanApp')
        .controller('editsalonCtrl', editsalonCtrl);

    editsalonCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editsalonCtrl($scope, $http, $location, $routeParams) {



        var id = $routeParams.id;
        var userid = $routeParams.userid;


        $http({
            method: 'GET',
            url: '/gestionusers/salon/'+id
        }).success(function (data) {
            $scope.salon = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });

        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.scatgs = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });
        $http({
            method: 'GET',
            url: '/gestionusers/ville'
        }).success(function (data) {
            $scope.villes = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });


        $scope.updateSalon = function () {
            $scope.messaguser="update success";
            console.log('ici fonction update salon');
            $http.put('/gestionusers/salon/' + $scope.salon._id, $scope.salon)
                .success(function (response) {
                    sweetAlert("félicitation...", "le salon est Modifier avec success", "success");
                    $location.url('/admin/profilesalon/'+userid)
                })
        }
    }

})();
