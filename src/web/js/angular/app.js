'use strict';

angular.module( "tide", ['tide.controllers'] ).config(
  ['$routeProvider',
   function ( $routeProvider )
   {
     $routeProvider.when( '/timesheet',
                          {controller: 'TimesheetCtrl', templateUrl: 'timesheet/index.html'} );
     $routeProvider.when( '/admin',
                          {templateUrl: 'dashboard/admin.html'} );
     $routeProvider.when( '/projects',
                          {controller: 'ProjectCtrl', templateUrl: 'project/list.html'} );
     $routeProvider.when( '/project/new',
                          {controller: 'ProjectCtrl', templateUrl: 'project/new.html'} );
     $routeProvider.when( '/users',
                          {controller: 'UserCtrl', templateUrl: 'user/list.html'} );
     $routeProvider.when( '/user/new',
                          {controller: 'UserCtrl', templateUrl: 'user/new.html'} );
     $routeProvider.when( '/user/edit/:userId',
                          {controller: 'UserEditCtrl', templateUrl: 'user/edit.html'} );
     $routeProvider.when( '/todo',
                          {templateUrl: 'dashboard/todo.html'} );
     $routeProvider.otherwise( {redirectTo: '/todo'} );
   }] );
