angular.module('teacher.assignments', [])

.controller('AssignmentsController', function ($scope, $http, $location) {  
  $scope.assignments;
  $scope.selectedAssignment = {};   
  $scope.assignmentSelected = false; 
  $scope.showingDescription;
  $scope.showingStudentContent = {};

  var assignmentsEndpoint = "https://api.edmodo.com/assignments";
  var assignmentSubmissionsEndpoint = "https://api.edmodo.com/assignment_submissions";
  var token ="12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d";
  
  function loadAssignments() {
  	$http({
  		method: 'GET',
  		url: assignmentsEndpoint + "?access_token=" + token + "&per_page=5"
  	}).then(function(response) {
  		$scope.assignments = response.data;
      // pull the current assignment from the query string
      var selectedAssignmentIndex = $location.search().assignment;      
      if (selectedAssignmentIndex !== undefined) {
        $scope.assignmentSelected = true;
        $scope.showingDescription = true;
        $scope.selectedAssignment = $scope.assignments[selectedAssignmentIndex];
      }  		
  	})
  }
  loadAssignments();  

 	$scope.showAssignmentInfo = function(index, element) {
 		$location.search('assignment', index);
    $scope.showingDescription = true;
 		$scope.assignmentSelected = true;  	
  	$scope.selectedAssignment = $scope.assignments[index];  	
  }

  $scope.toggleAssignmentView = function(element) {
  	// show the assignment info page
  	if (element.target.id === "assignment"){
  		$scope.showingDescription = true;
  	} else {
  		// show the submissions for that assignment
  		$scope.showingDescription = false;  		
  		$http({
  			method: 'GET',
  			url: assignmentSubmissionsEndpoint,
  			params: 
  				{
  					assignment_id: $scope.selectedAssignment.id, 
  					assignment_creator_id: $scope.selectedAssignment.creator.id,
  					access_token: token
  				}
  		}).then(function(response) {  			
  			$scope.selectedAssignmentSubmissions = response.data;
  		})
  	} 
  }

  $scope.showStudentContent = function(index, element) {
    // if that item is already showing, hide it
    if ($scope.showingStudentContent[index]) {
      $scope.showingStudentContent[index] = false;
    } else {
      $scope.showingStudentContent[index] = true;
    }
  }

  $scope.visibleStudentContent = function(index) {
    if ($scope.showingStudentContent[index]) {
      return true;
    }
  }

 
});