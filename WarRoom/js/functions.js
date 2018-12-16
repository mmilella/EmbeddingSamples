var projectNumber = 1
var refreshTimer;
var refreshTimerInterval = 20000; //20 seconds

$( document ).ready(function() {
    //update the status on the page to right now.
    $(".status-text").html( "Last Page Update:<br>" + new Date(Date.now()));

    //set a timer to refresh the page every so often
    refreshTimer = setTimeout(refreshPage, refreshTimerInterval);
});

function refreshPage() {
  //clear the timer while doing work
  clearTimeout(refreshTimer);

  //hide all the charts while doing work.
  $("#report1").hide();
  $("#report2").hide();
  $("#report3").hide();
  $("#report4").hide();

  //toggle the project number to load a fresh set of charts based on project naming convention.
  if (projectNumber == 1){
    projectNumber = 2;
  }
  else {
    projectNumber = 1;
  }

  var projectName = "Embed Sample - War Room " + projectNumber.toString();

  $("#report1").attr("project-path", "/users/admin/" + projectName);
  $("#report1").attr("active-tab-id", "4");

  $("#report2").attr("project-path", "/users/admin/" + projectName);
  $("#report2").attr("active-tab-id", "1");

  $("#report3").attr("project-path", "/users/admin/" + projectName);
  $("#report3").attr("active-tab-id", "3");

  $("#report4").attr("project-path", "/users/admin/" + projectName);
  $("#report4").attr("active-tab-id", "6");


  //show the new projects
  $("#report1").show();
  $("#report2").show();
  $("#report3").show();
  $("#report4").show();

  //update the page status
  $(".status-text").html( "Last Page Update:<br>" + new Date(Date.now()));
  //restart the timer
  refreshTimer = setTimeout(refreshPage, refreshTimerInterval);
}
