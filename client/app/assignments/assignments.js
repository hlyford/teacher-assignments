angular.module('teacher.assignments', [])

.controller('AssignmentsController', function ($scope, $http, $location, Assignments, Submissions) {  
  $scope.assignments;
  $scope.selectedAssignment = {};   
  $scope.assignmentSelected = false; 
  $scope.showingDescription;
  $scope.showingStudentContent = {};

  // params needed for API calls
  var assignmentsEndpoint = "https://api.edmodo.com/assignments";
  var assignmentSubmissionsEndpoint = "https://api.edmodo.com/assignment_submissions";
  var token ="12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d";
  var per_page = 5;
  
  // calls the API to retrieve the assignments
  function loadAssignments() {
    Assignments.getAssignments(assignmentsEndpoint, token, per_page)
      .then(function(response) {             
        $scope.assignments = response;        
      // pull the current assignment from the query string if there is a search param
        var selectedAssignmentIndex = $location.search().assignment;      
        if (selectedAssignmentIndex !== undefined) {
          $scope.assignmentSelected = true;
          $scope.showingDescription = true;
          $scope.selectedAssignment = $scope.assignments[selectedAssignmentIndex];
        }
      });      
  }
  loadAssignments();  

  // determines which assignment's info will render
 	$scope.showAssignmentInfo = function(index, element) {
 		$location.search('assignment', index);
    $scope.showingDescription = true;
 		$scope.assignmentSelected = true;  	
  	$scope.selectedAssignment = $scope.assignments[index];  	
  }

  // determines whether to show the assignment's info or student submissions
  $scope.toggleAssignmentView = function(element) {    
  	// show the assignment info page
  	if (element.target.id === "assignment"){
  		$scope.showingDescription = true;
  	} else {
  		// show the submissions for that assignment
      $scope.showingDescription = false;    
      Submissions.getSubmissions(assignmentSubmissionsEndpoint, token, $scope.selectedAssignment.id, $scope.selectedAssignment.creator.id)
  		  .then(function(response) {                  
        $scope.selectedAssignmentSubmissions = response;
      })  	
  	} 
  }

  // determines whether or not to show student's content of submission
  $scope.showStudentContent = function(index, element) {
    $scope.showingStudentContent[index] ? $scope.showingStudentContent[index] = false : $scope.showingStudentContent[index] = true;    
  }

  // determines which students' content is showing at given time
  $scope.visibleStudentContent = function(index) {    
    if ($scope.showingStudentContent[index]) {      
      return true;
    }
  }

  // logic for adding new assignment
  $scope.newAssignment = {
    title: "Enter title",
    prompt: "Enter prompt",
    due_at: "2016-06-29T00:22:32.000Z"

  };
  $scope.addAssignment = function() {    
    $scope.assignments.push({
      title: $scope.newAssignment.title,
      description: $scope.newAssignment.prompt,
      due_at: $scope.newAssignment.due_at
    });    
    // reset the entries on state
    $scope.newAssignment.title = '', $scope.newAssignment.prompt='';    
  };
 
});