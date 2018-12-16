  var loadingTimerInterval = 1000;
  var loginwindow;
  var loadingTimer;

$( document ).ready(function() {
  $("#reports").show();
  $("#loginbutton").hide();
  
  if ( !isDVContentLoading() ) {
    //hide all the chart or charts while doing work.
    $("#reports").hide();
    $("#loginbutton").show();

    //start a time to see if the content is loaded
    loadingTimer = setInterval(checkForContent, loadingTimerInterval);

    //show the login button
    $( "#loginbutton" ).click(function() {
      //attempt to center the popup but needs more code to deal with multiple monitors
      var wWidth = 500;
      var wHeight = 500;
      var wLeft = Number((window.innerWidth / 2) - (wWidth / 2));
      var wTop = Number((window.innerHeight / 2) - (wHeight / 2));
      var params = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=' + wWidth + ', height=' + wHeight + ', top=' + wTop + ', left=' + wLeft;

      //show the login screen as a popup, iFrames or anything not user launched will not work!
      loginwindow = open("http://slc04rrs.us.oracle.com:9704/dv/ui/timeout.jsp", "DV Login", params);
      console.log (loginwindow);

    });
  }
});

function checkForContent(){
  if ( isDVContentLoading() ) {
    //show the chart or charts when the content is loaded
    $("#loginbutton").hide();
    $("#reports").show();
    //force a resize to propelry display the chart in all cases
    $("#reports").height("99%");
    $("#reports").height("100%");

    //stop the timer is DV content id loaded
    window.clearInterval(loadingTimer);

    //close the login window if it is open
    if(loginwindow != null) {
      loginwindow.close();
    }

    return;
  }

  //change a propery of the oracle-dv tag to force a retry of the load.
  $("#report1").attr("active-page", "");
  $("#report1").attr("active-page", "canvas");


}

function isDVContentLoading(){
  //check if the main div is present for embedded content
  console.log($(".bitech").length);
  if ( $(".bitech").length > 0 ) {
    return true;
  }
  return false;
}
