'use strict';

angular.module( 'tide.controllers', [] ).
  controller( 'ProjectCtrl',
              function ( $scope, $location )
              {
                $scope.projects = dataStore['projects'];

                $scope.save = function ()
                {
                  addProject( {'name': $scope.project.name, 'desc': $scope.project.desc} );
                  $location.path( '/projects' );
                };
              } )

  .controller( 'UserCtrl',
               function ( $scope, $location )
               {
                 $scope.users = dataStore['users'];

                 $scope.save = function ()
                 {
                   addUser( {'name': $scope.user.name} );
                   $location.path( '/users' );
                 };
               } )

  .controller( 'UserEditCtrl',
               function ( $scope, $location, $routeParams )
               {
                 $scope.user = angular.copy( findUser( $routeParams.userId ) );

                 $scope.save = function ()
                 {
                   updateUser( $scope.user.id, {'name': $scope.user.name} );
                   $location.path( '/users' );
                 };
               } );
