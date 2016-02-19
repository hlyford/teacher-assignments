angular.module('teacher.factories', [])
// FACTORY FOR GET-ING ASSIGNMENTS
.factory('Assignments', function ($http) {
  var getAssignments = function (url, token, per_page) {
    return $http({
      method: 'GET',
      url: url,
      params: {access_token: token, per_page: per_page}
    })
    .then(function (resp) {      
      return resp.data;
    });
  };

  return {
    getAssignments: getAssignments
  };
})
// FACTORY FOR GET-ING SUBMISSIONS
.factory('Submissions', function ($http) {
  var getSubmissions = function (url, token, assignment_id, assignment_creator_id) {
    if (assignment_id === undefined) {
      return; 
    } else {
      return $http({
        method: 'GET',
        url: url,
        params: {access_token: token, assignment_id: assignment_id, assignment_creator_id: assignment_creator_id}
      })
      .then(function (resp) {      
        return resp.data;
      });
    }
  };

  return {
    getSubmissions: getSubmissions    
  };
})