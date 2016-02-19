var app = angular.module('teacher', 
  ['teacher.services', 'teacher.assignments', 'ngRoute']);

app.config(function ($routeProvider, $httpProvider) {
  $routeProvider    
    .when('/', {
      templateUrl: 'app/assignments/assignments.html',
      controller: 'AssignmentsController',
      reloadOnSearch: false
    })          
    .otherwise({redirectTo: '/'});    


})