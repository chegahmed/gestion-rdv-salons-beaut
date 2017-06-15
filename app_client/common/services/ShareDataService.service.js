(function () {

    angular
        .module('userApp')
        .service('ShareDataService', ShareData);

   // ShareData.$inject = ['$http', '$window','$location'];
    function ShareData() {
        var shareDataService = this;

        shareDataService.searchQuery = {};

        shareDataService.getSearchQuery = function () {
            return shareDataService.searchQuery;
        }

        shareDataService.setSearchQuery = function (searchQuery) {
            shareDataService.searchQuery = searchQuery;
        }

        return {
            getSearchQuery : getSearchQuery,
            setSearchQuery : setSearchQuery,
        };
    }

})();