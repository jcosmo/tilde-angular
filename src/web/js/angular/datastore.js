var dataStore = {
  'projects': [
    {id: 0, name: 'Proj 1', desc: 'foo boar bob'},
    {id: 1, name: 'Proj 2', desc: 'something'}
  ],
  'users': [
    {id: 0, name: 'James', projects: [1]},
    {id: 1, name: 'Ian', projects: [1, 2]}
  ]};

function nextId( list )
{
  var max = 0;
  for ( var i = 0; i < list.length; i++ )
  {
    if ( list[i].id >= max )
    {
      max = list[i].id;
    }
  }
  return max + 1;
}

function addUser( user )
{
  user.id = nextId( dataStore.users );
  user.projects = [];
  dataStore.users.push( user );
}

function addProject( project )
{
  project.id = nextId( dataStore.projects );
  dataStore.projects.push( project );
}

function findUser( id )
{
  return find( dataStore.users, id );
}

function find( list, id )
{
  for ( var i = 0; i < list.length; i++ )
  {
    if ( id == list[i].id )
    {
      return list[i];
    }
  }
  return undefined;
}

function updateUser( id, props )
{
  user = findUser( id );
  user.name = props.name;
  user.projects = props.projects;
}