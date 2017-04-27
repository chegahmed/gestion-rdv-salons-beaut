(function () {

    angular
        .module('meanApp')
        .controller('editprofilesalonCtrl', editprofilesalonCtrl);

    editprofilesalonCtrl.$inject = ['$scope', '$http', '$location', '$routeParams'];
    function editprofilesalonCtrl($scope, $http, $location, $routeParams) {
        $scope.message = "hello ahmed";




        $scope.user = {};
        var id = $routeParams.id;


        $http({
            method: 'GET',
            url: '/gestionusers/' + id
        }).success(function (data) {
            $scope.user = data; // response data
        });

        $scope.updateProfile = function () {

            $http.put('/gestionusers/' + $scope.user._id, $scope.user)
                .success(function (response) {
                    sweetAlert("félicitation...", "Votre profile et modifier avec success Modifier avec success", "success");
                    $location.url('/profilesalon/'+id)
                })
        }
    }

})();
