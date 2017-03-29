(function () {

    angular
        .module('meanApp')
        .service('gestionusers', gestionusers);

    gestionusers.$inject = ['$http', '$window'];
    function gestionusers ($http, $window) {

        var o = {
            userss: [],
            users: {}
        };

       var getAll = function(){
            console.log('enter get all in services');
            var promise = $q.defer(); // the $q helps create a promise

            return $http.get('/').success(function(data){
                promise.resolve(data); // promise returns data when resolved
            });
            return promise; // returns a promise
        };

        o.create = function() {
            return $http.post('/db', o.users).success(function(data){
                o.users.push(data);
            });
        };


        return {
            getAll : getAll

        };
    }


})();