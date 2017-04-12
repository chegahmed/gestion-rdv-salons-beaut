(function () {

    angular
        .module('meanApp')
        .controller('gestionusersCtrl', gestionusersCtrl);

    gestionusersCtrl.$inject = ['$scope', '$http','$location'];
    function gestionusersCtrl($scope, $http ,$location) {

        $scope.names = ["Emil", "Tobias", "Linus"];
        $scope.message = "hello ahmed";


        $http({
            method: 'GET',
            url: '/gestionusers'
        }).success(function (data) {
            $scope.users = data; // response data
        }).error(function (response) {
            console.log('error message :',response);
        });








        $scope.deleteUser = function deleteUser(user) {

            $scope.messaguser = "delete success";
            $http.delete("/gestionusers/" + user._id).success(function (response) {
                var index = $scope.users.indexOf(user)
                $scope.users.splice( index ,1);
                $scope.ALertSuccess(user.name +' supprimer avec success');
                //   $scope.users.pop(user);
            })

        }

        $scope.ALertSuccess =function ALertSuccess(message) {
            $scope.msgalert=message;
            $scope.alert = true;
        }




        // ici pour pagination
        $scope.curPage = 0;
        $scope.pageSize = 2;

        $scope.numberOfPages = function () {
            return Math.ceil($scope.users.length / $scope.pageSize);
        };

        //ici pour serche
        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;

        }


    }

})();


/*
 .success(function (response) {
 //  window.location.reload();
 //  $scope.user.pop(user);
 $state.go('/', {}, {reload: true});

 })*/
