'use strict';

angular.module( "tide", ['tide.controllers'] ).config(
  ['$routeProvider',
   function ( $routeProvider )
   {
     $routeProvider.when( '/projects',
                          {controller: 'ProjectCtrl', templateUrl: 'project/list.html'} );
     $routeProvider.when( '/project/new',
                          {controller: 'ProjectCtrl', templateUrl: 'project/new.html'} );
     $routeProvider.when( '/users',
                          {controller: 'UserCtrl', templateUrl: 'user/list.html'} );
     $routeProvider.when( '/user/new',
                          {controller: 'UserCtrl', templateUrl: 'user/new.html'} );
     $routeProvider.otherwise( {redirectTo: '/projects'} );
   }] );

var dataStore = {
  'projects': [
    {name: 'Proj 1', desc: 'foo boar bob'},
    {name: 'Proj 2', desc: 'something'}
  ],
  'users': [
    {name: 'James'},
    {name: 'Ian'}
  ]};

