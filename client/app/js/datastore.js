var dataStore = {
  'projects': [
    {id: 0, name: 'Proj 1', desc: 'foo boar bob'},
    {id: 1, name: 'Proj 2', desc: 'something'}
  ],
  'users': [
    {id: 0, name: 'James', projects: [0]},
    {id: 1, name: 'Ian', projects: [0, 1]}
  ],
  'work': [
    {id:0, userid: 1, projectid: 0, date: moment().startOf('day'), hours: 3, comment: 'no comment'},
    {id:1, userid: 1, projectid: 0, date: moment().startOf('day' ).add(2, 'days'), hours: 4, comment: 'a comment'},
    {id:2, userid: 1, projectid: 1, date: moment().startOf('day' ).add(2, 'days'), hours: 2, comment: 'proj 2'}
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

function findProject( id )
{
  return find( dataStore.projects, id );
}

function findWorkForUser( id, fromDate, toDate )
{
  var w = {};
  for ( var i = 0; i < dataStore.work.length; i++ )
  {
    if ( dataStore.work[i].userid == id )
    {
      if (!w[dataStore.work[i].projectid])
      {
        w[dataStore.work[i].projectid] = [dataStore.work[i]];
      }
      else
      {
        w[dataStore.work[i].projectid].push(dataStore.work[i]);
      }
    }
  }
  return w;
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