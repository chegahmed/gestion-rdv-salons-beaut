(function () {

  angular
    .module('meanApp')
    .directive('headersalon', headersalon);

  function headersalon () {
    return {
      restrict: 'EACM',
      templateUrl: '/common/directives/headersalon/headersalon.template.html',
      controller: 'headersalonCtrl as navvm'
    };
  }

})();