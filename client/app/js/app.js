'use strict';

var app = angular.module( "tide", ['ngRoute', 'tideControllers']);
app.config(
  ['$routeProvider',
   function ( $routeProvider )
   {
     $routeProvider.when( '/timesheet',
                          {controller: 'TimesheetCtrl', templateUrl: 'partials/timesheet/index.html'} );
     $routeProvider.when( '/timesheet/:from',
                          {controller: 'TimesheetCtrl', templateUrl: 'partials/timesheet/index.html'} );
     $routeProvider.when( '/admin',
                          {controller: 'AdminCtrl', templateUrl: 'partials/dashboard/admin.html'} );
     $routeProvider.when( '/projects',
                          {controller: 'ProjectCtrl', templateUrl: 'partials/admin/project/list.html'} );
     $routeProvider.when( '/project/new',
                          {controller: 'ProjectCtrl', templateUrl: 'partials/admin/project/new.html'} );
     $routeProvider.when( '/users',
                          {controller: 'UserCtrl', templateUrl: 'partials/admin/user/list.html'} );
     $routeProvider.when( '/user/new',
                          {controller: 'UserCtrl', templateUrl: 'partials/admin/user/new.html'} );
     $routeProvider.when( '/user/edit/:userId',
                          {controller: 'UserEditCtrl', templateUrl: 'partials/admin/user/edit.html'} );
     $routeProvider.when( '/todo',
                          {controller: 'TestCtrl', templateUrl: 'partials/dashboard/todo.html'} );

     $routeProvider.otherwise( {redirectTo: '/todo'} );
   }] );
app.run(['$rootScope', function startup($rootScope) {
  $rootScope.site = {
    title: 'undefined',
    login: {}
  };
}]);
