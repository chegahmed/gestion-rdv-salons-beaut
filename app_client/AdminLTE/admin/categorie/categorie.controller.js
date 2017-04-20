
    (function () {

        angular
            .module('meanApp')
            .controller('categorieCtrl', categorieCtrl);

        categorieCtrl.$inject = ['$scope', '$http'];
        function categorieCtrl($scope, $http) {




            $http({
                method: 'GET',
                url: '/gestionusers/categorie'
            }).success(function (data) {
                $scope.categories = data; // response data
                console.log(data)
            });


            $scope.showSearch =function showSearch(value) {
                if(value==""){
                    $http({
                        method: 'GET',
                        url: '/gestionusers/categorie'
                    }).success(function (data) {
                        $scope.categories = data; // response data
                    });
                }else{
                    $http({
                        method: 'GET',
                        url: '/gestionusers/categoriesearch/'+value
                    }).success(function (data) {
                        $scope.categories = data; // response data
                    });
                }
            }




            $scope.deleteCategorie = function deleteCategorie(categorie) {
                swal({
                    title: "vous êtes sûr ?",
                    text: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "oui , Supprimer!",
                    confirmButtonColor: "#ec6c62"
                }, function() {

                    $http.delete("/gestionusers/categorie/" + categorie._id).success(function (response) {
                        var index = $scope.categories.indexOf(categorie)
                        $scope.categories.splice( index ,1);
                        swal("Supprimer!", "catégorie a été supprimé avec succès!", "success");
                    }).error(function (response) {
                        swal("Oops", "We couldn't connect to the server!", "error");
                    });

                });


            }


            // ici pour pagination
            $scope.curPage = 0;
            $scope.pageSize = 2;

            $scope.numberOfPages = function () {
                return Math.ceil($scope.categories.length / $scope.pageSize);
            };

            //ici pour serche
            $scope.sort = function (keyname) {
                $scope.sortKey = keyname;
                $scope.reverse = !$scope.reverse;
            }
        }
    })();