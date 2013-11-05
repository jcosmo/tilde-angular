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
               function ( $scope, $rootScope, $routeParams )
               {
                 $rootScope.pagetitle = "Timesheet";
                 $rootScope.login = angular.copy( findUser( 1 ) );

                 $scope.user = $rootScope.login
                 $scope.findProject = findProject;

                 var today = moment().startOf('day');
                 var firstDay = ($routeParams.from ? moment($routeParams.from, 'YYYYMMDD') : moment()).startOf('day');

                 $scope.days = [];
                 for (var i = 0; i < 7; i++)
                 {
                   var day = firstDay.clone().add('days', i )
                   var dayData = {'name': day.format('ddd MMM DD')};
                   if ( day.isSame(today) )
                   {
                     dayData.today = true;
                   }
                   $scope.days.push( dayData );
                 }
                 $scope.work = findWorkForUser($scope.user.id, firstDay, firstDay.clone().add('days', 7));
               } );

tc.controller( 'TestCtrl',
               function TestCtrl( $scope, $rootScope )
               {
                 $rootScope.login = angular.copy( findUser( 1 ) );
                 $rootScope.pagetitle = "Test Controller";
               } );
