(function () {

    angular
        .module('meanApp')
        .controller('headerAdminCtrl', headerAdminCtrl);

    headerAdminCtrl.$inject = ['$location', 'authentication','$scope'];
    function headerAdminCtrl($location, authentication, $scope) {

$scope.mymesssage ='hellomed'


    }

})();