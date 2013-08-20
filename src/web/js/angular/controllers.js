'use strict';

angular.module( 'tide.controllers', [] ).
  controller( 'ProjectCtrl',
              function ( $scope, $location )
              {
                $scope.projects = dataStore['projects'];

                $scope.save = function( name, desc ) {
                  $scope.projects.push( {'name' :$scope.project.name, 'desc': $scope.project.desc });
                  $location.path('/projects');
                };
              } )

  .controller( 'UserCtrl',
               function ( $scope, $location )
               {
                 $scope.users = dataStore['users'];

                 $scope.save = function( name, desc ) {
                   $scope.users.push( {'name' :$scope.user.name });
                   $location.path('/users');
                 };
               } );
