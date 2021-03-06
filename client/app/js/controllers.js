'use strict';

var tc = angular.module( 'tideControllers', [] );

tc.controller( 'AdminCtrl',
               function ( $scope )
               {
                 $scope.site.title = "Administration";
                 $scope.site.login = angular.copy( findUser( 1 ) );
               } );

tc.controller( 'ProjectCtrl',
               function ( $scope, $location )
               {
                 $scope.site.title = "Project Administration";
                 $scope.site.login = angular.copy( findUser( 1 ) );
                 $scope.projects = dataStore.projects;

                 $scope.save = function ()
                 {
                   addProject( {'name': $scope.project.name, 'desc': $scope.project.desc} );
                   $location.path( '/projects' );
                 };
               } );

tc.controller( 'UserCtrl',
               function ( $scope, $location )
               {
                 $scope.site.title = "User Administration";
                 $scope.site.login = angular.copy( findUser( 1 ) );
                 $scope.users = dataStore.users;

                 $scope.save = function ()
                 {
                   addUser( {'name': $scope.user.name} );
                   $location.path( '/users' );
                 };
               } );

tc.controller( 'UserEditCtrl',
               function ( $scope, $location, $routeParams )
               {
                 $scope.site.title = "User Administration";
                 $scope.site.login = angular.copy( findUser( 1 ) );
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
               function ( $scope, $routeParams, $dialogs )
               {
                 $scope.site.title = "Timesheet";
                 $scope.site.login = angular.copy( findUser( 1 ) );

                 $scope.user = $scope.site.login
                 $scope.findProject = findProject;

                 var today = moment().startOf('day');
                 var firstDay = ($routeParams.from ? moment($routeParams.from, 'YYYYMMDD') : moment()).startOf('day');

                 $scope.days = [];
                 for (var i = 0; i < 7; i++)
                 {
                   var day = firstDay.clone().add('days', i )
                   var dayData = {name: day.format('ddd MMM DD'),  date: day};
                   if ( day.isSame(today) )
                   {
                     dayData.today = true;
                   }
                   $scope.days.push( dayData );
                 }
                 $scope.work = findWorkForUser($scope.user.id, firstDay, firstDay.clone().add('days', 7));
                 $scope.findOrCreateWorkForProject = function( workSet, day, projectid)
                   {
                     var existing = _.find( workSet[projectid], function (work) { return work.date.isSame(day.date) } );
                     if (existing != undefined)
                     {
                       return existing;
                     }
                     existing = newWorkPlaceholder($scope.user.id, projectid, day.date);
                     return existing;
                   };

                 $scope.openComment = function openComment( work ) {
                   var dlg = $dialogs.create('/partials/timesheet/comment.html?c=' + new Date().getTime(),'CommentDlgCtrl',{
                     work: work
                   },{key: false, back: 'static'});
                   dlg.result.then(function onOk(name){
                     ;
                   },function onCancel(){
                     ;
                   });
                 };
               } );

tc.controller( 'TestCtrl',
               function TestCtrl( $scope )
               {
                 $scope.site.title = "Test Controller";
                 $scope.site.login = angular.copy( findUser( 1 ) );
               } );

tc.filter('wc_active', function() { return function(x) {return x != undefined && x.comment != undefined ? 'active' : 'inactive'; } });


tc.controller('CommentDlgCtrl',function($scope,$modalInstance,data){
  $scope.work = data['work'];
  $scope.project = findProject(data['work'].projectid);

  $scope.cancel = function(){
    $modalInstance.dismiss('cancelled');
  }; // end cancel

  $scope.save = function(work){
    if ( undefined == work.id )
    {
      addWork( work );
    }
    else
    {
      var w = findWork( work.id );
      w.comment = work.comment;
    }

    $modalInstance.dismiss('closed');
  }; // end save

  $scope.hitEnter = function(evt){
    if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
      $scope.save();
  }; // end hitEnter

  $scope.renderDate = function( work ) {
    return moment().format('ddd MMM DD');
  }
});