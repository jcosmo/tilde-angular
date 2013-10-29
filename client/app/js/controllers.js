'use strict';

var tc = angular.module( 'tideControllers', [] );

tc.controller( 'AdminCtrl',
               function ( $scope, $rootScope, $location )
               {
                 $rootScope.pagetitle = "Administration";
                 $rootScope.login = angular.copy( findUser( 1 ) );
               } );

tc.controller( 'ProjectCtrl',
               function ( $scope, $rootScope, $location )
               {
                 $rootScope.pagetitle = "Project Administration";
                 $rootScope.login = angular.copy( findUser( 1 ) );
                 $scope.projects = dataStore.projects;

                 $scope.save = function ()
                 {
                   addProject( {'name': $scope.project.name, 'desc': $scope.project.desc} );
                   $location.path( '/projects' );
                 };
               } );

tc.controller( 'UserCtrl',
               function ( $scope, $rootScope, $location )
               {
                 $rootScope.pagetitle = "User Administration";
                 $rootScope.login = angular.copy( findUser( 1 ) );
                 $scope.pagetitle = 'User Administration';
                 $scope.users = dataStore.users;

                 $scope.save = function ()
                 {
                   addUser( {'name': $scope.user.name} );
                   $location.path( '/users' );
                 };
               } );

tc.controller( 'UserEditCtrl',
               function ( $scope, $rootScope, $location, $routeParams )
               {
                 $rootScope.pagetitle = "User Administration";
                 $rootScope.login = angular.copy( findUser( 1 ) );
                 $scope.user = angular.copy( findUser( $routeParams.userId ) );

                 $scope.findProject = findProject;

                 $scope.unassignedProjects = _.filter( dataStore.projects, function ( x )
                 {
                   return !_.contains( $scope.user.projects, x.id );
                 } );

                 $scope.save = function ()
                 {
                   updateUser( $scope.user.id,
                               {'name': $scope.user.name, 'projects': $scope.user.projects} );
                   $location.path( '/users' );
                 };
               } );

tc.controller( 'TimesheetCtrl',
               function ( $scope, $rootScope )
               {
                 $rootScope.pagetitle = "Timesheet";
                 $rootScope.login = angular.copy( findUser( 1 ) );
                 $scope.user = $rootScope.login
                 $scope.findProject = findProject;
                 $scope.days = [
                   {'dayname': 'Monday', 'date': '1 Jan 2013' },
                   {'dayname': 'Tuesday', 'date': '2 Jan 2013' }
                 ]
               } );

tc.controller( 'TestCtrl',
               function TestCtrl( $scope, $rootScope )
               {
                 $rootScope.login = angular.copy( findUser( 1 ) );
                 $rootScope.pagetitle = "Test Controller";
               } );
