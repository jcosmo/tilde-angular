function UserMgr() { }

UserMgr.prototype.assignProject = function ( user, projectId )
{
  if ( user.projects.indexOf( projectId ) == -1 )
  {
    user.projects.push( projectId );
    var scope = angular.element( $( "#userForm" ) ).scope();
    scope.unassignedProjects = _.without( scope.unassignedProjects, findProject( projectId ) );
  }
};

UserMgr.prototype.unassignProject = function ( user, projectId )
{
  if ( user.projects.indexOf( projectId ) != -1 )
  {
    var scope = angular.element( $( "#userForm" ) ).scope();
    scope.unassignedProjects.push( findProject( projectId ) );
    user.projects = _.without( user.projects, projectId );
  }
};

UserMgr.prototype.drag = function ( event )
{
  event.dataTransfer.setData( "Text", event.target.dataset["projectid"] );
};

UserMgr.prototype.dropAndAssign = function ( event )
{
  event.preventDefault();
  var scope = angular.element( $( "#userForm" ) ).scope();
  scope.$apply( function ()
                {
                  $userMgr.assignProject( scope.user, parseInt( event.dataTransfer.getData( "Text" ) ) );
                } )
};

UserMgr.prototype.dropAndUnassign = function ( event )
{
  event.preventDefault();
  var scope = angular.element( $( "#userForm" ) ).scope();
  scope.$apply( function ()
                {
                  $userMgr.unassignProject( scope.user, parseInt( event.dataTransfer.getData( "Text" ) ) );
                } )
};

UserMgr.prototype.allowDrop = function ( event )
{
  event.preventDefault();
};

var $userMgr = new UserMgr();