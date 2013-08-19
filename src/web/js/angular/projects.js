function ProjectCtrl($scope) {
  $scope.projects = [
    {name:'Proj 1', desc:'foo boar bob'},
    {name:'Proj 2'}
    ];
 
  $scope.deleteProject = function(id) {
  }
  
  $scope.addProject = function() {
    $scope.projects.push({name:$scope.projectName, desc:$scope.projectDesc});
    $scope.projectName = '';
    $scope.projectDesc = '';
  };
 }