
(function () {

    angular
        .module('meanApp')
        .controller('souscategorieCtrl', souscategorieCtrl);

    souscategorieCtrl.$inject = ['$scope', '$http'];
    function souscategorieCtrl($scope, $http) {




        $http({
            method: 'GET',
            url: '/gestionusers/souscategorie'
        }).success(function (data) {
            $scope.souscategories = data; // response data
         //   console.log(data)
        });


        $http({
            method: 'GET',
            url: '/gestionusers/categorie'
        }).success(function (data) {
            $scope.catgs = data; // response data
         //   console.log(data)
        });


        $scope.showSearch =function showSearch(value) {
            if(value==""){
                $http({
                    method: 'GET',
                    url: '/gestionusers/souscategorie'
                }).success(function (data) {
                    $scope.souscategories = data; // response data
                });
            }else{
                $http({
                    method: 'GET',
                    url: '/gestionusers/souscategoriesearch/'+value
                }).success(function (data) {
                    $scope.souscategories = data; // response data
                });
            }
        }




        $scope.deleteSousCategorie = function deleteSousCategorie(souscategorie) {
            swal({
                title: "vous êtes sûr ?",
                text: "Êtes-vous sûr de vouloir supprimer cette sous catégorie ?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Annuler",
                closeOnConfirm: false,
                confirmButtonText: "oui , Supprimer!",
                confirmButtonColor: "#ec6c62"
            }, function() {

                $http.delete("/gestionusers/categorie/" + souscategorie._id).success(function (response) {
                    var index = $scope.souscategories.indexOf(souscategorie)
                    $scope.souscategories.splice( index ,1);
                    swal("Supprimer!", "sous catégorie a été supprimé avec succès!", "success");
                }).error(function (response) {
                    swal("Oops", "We couldn't connect to the server!", "error");
                });

            });


        }



    }
})();