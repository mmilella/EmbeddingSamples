$(document).ready(function() {
  var cardOpen = false;

  $( "#back-to-top" ).click(function() {
    $("html, body").animate({ scrollTop: "0px" });
    $( "#back-to-top" ).css("display", "none");
  });

  $( window ).scroll(function() {
    if($(this).scrollTop() > 0){
      $( "#back-to-top" ).css("display", "block");
    }
    else {
      $( "#back-to-top" ).css("display", "none");
    }
  });

  $( "#refresh-page" ).click(function() {
    location.reload();
  });

  $(".activator").click(function() {
    var mycard = $(this).closest('div[class="card"]');
    setTimeout(function(){
            mycard.css( "width", "99%" );
            console.log("resize")
            setTimeout(function(){
                    mycard.css( "width", "100%" );
                    console.log("fixed")
               },20);
       },10);
  });

  $(".close-narrative").click(function() {
    $(".card").css( "width", "100%" );
  });

  $( ".full-screen" ).click(function() {
    var mycard = $(this).closest('div[class="card"]');
    if (cardOpen) {
      cardOpen = false;
      $( ".card" ).css( "display", "block" );
      mycard.removeAttr("style");
      this.innerHTML = '<i class="material-icons small right blue-grey-text">fullscreen</i>'
    } else {
      cardOpen = true;
      $( ".card" ).css( "display", "none" );
      mycard.css( "display", "block" );
      mycard.css( "position", "absolute" );
      mycard.css( "top", "0" );
      mycard.css( "left", "0" );
      mycard.css( "width", "100%" );
      mycard.css( "height", "100%" );
      mycard.css( "border-radius", "0px" );
      this.innerHTML = '<i class="material-icons small right blue-grey-text">close</i>'
    }

  });

});
