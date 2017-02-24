var z,y,count = 0;
$(document).ready(function(){  
$("#interface").keypress(function (e) {
    if(e.which == 13 && !e.shiftKey) {        
      goHere();
      e.preventDefault();
      return false;
    }
  });
});
  function ultimate() {
    $(document).ready(function(){
            $(".holder").toggle();
            $(".holder").css("position", "fixed");
            window_width = $(window).width(); //Get the user's window's width
            window_height = $(window).height(); //Get the user's window's height
            $(".holder").css("left", (window_width-$(".holder").width())/2);
            //$(".holder").css("top", (window_height-$(".holder").height())/2);
    });
    
    // if (count%2==0) {
    // y=1337;
    // console.log("Elite mode active!");
    // document.getElementById("insert_here").innerHTML += "<div class='day'>1337 mode activated</div>";scroll();
    // }
    // else
    // {
    //   y=0;
    //   console.log("Elite mode deactivated!");
    //   document.getElementById("insert_here").innerHTML += "<div class='day'>1337 mode deactivated</div>";scroll();
    // }
    // count+=1;
  }
	function settings()
  {
    ultimate();
    if (document.getElementById("eliteMode").checked == true) {
      y=1337;
      console.log("Elite mode active!");
      document.getElementById("insert_here").innerHTML += "<div class='day'>1337 mode activated</div>";scroll();
    }
    if (document.getElementById("eliteMode").checked == false) {
      y=0;
      console.log("Elite mode deactivated!");
      document.getElementById("insert_here").innerHTML += "<div class='day'>1337 mode deactivated</div>";scroll();
    }
    if (document.getElementById("movieMode").checked == true) {
      z=2;
      console.log("Movie mode activated!");
      document.getElementById("insert_here").innerHTML += "<div class='day'>Movie mode activated</div>";scroll();
    }
    if (document.getElementById("movieMode").checked == false) {
      z=0;
      console.log("Movie mode deactivated!");
      document.getElementById("insert_here").innerHTML += "<div class='day'>Movie mode dectivated</div>";scroll();
    }
  }
	function goHere() 
  {
		var x = document.getElementById("interface").value;
    document.getElementById("interface").value="";
		document.getElementById("insert_here").innerHTML += "<li class='self'><div class='msg'><div class='user'>You</div><p>"+x+"</p><time name='time'></time></div></li>";
		Time();
		scroll();
    switch(z)
    {

    default:

		jQuery.ajax
    ({
      type: "POST",
      url: 'chatbot.php',
      dataType: 'json',
      data: {functionname: 'getWolfram', arguments: [x,y]},
      success: function (obj, textstatus) {
                  if( !('error' in obj) ) {
                      yourVariable = obj.result;
                      console.log(yourVariable);
                      //format output if it's too long
                      if (yourVariable.includes("<plaintext>")) {
                        
                        if(y!=1337)document.getElementById("insert_here").innerHTML += "<p class='notification'>No short answer availiable</p>";
                      yourVariable = yourVariable.substring(11+yourVariable.search("<plaintext>"),yourVariable.search("</plaintext>"));

                      //if output is a table display image instead
                      if (yourVariable.includes("|") ||yourVariable.trim()=="") {
                        yourVariable = obj.result;
                        yourVariable = yourVariable.substring(yourVariable.search("<img"),yourVariable.search("<plaintext>"));
                    }
                    }
                    yourVariable=yourVariable.replace("Wolfram", "Project");
                    yourVariable=yourVariable.replace("Alpha", "Ask");
                      document.getElementById("insert_here").innerHTML += "<li class='other'><div class='msg'><div class='user'>Bot<span class='range admin'>Admin</span></div><p>"+yourVariable+"</p><time name='time'></time></div></li>";
                      Time();
                      scroll();
                                        }
                  else {
                      console.log(obj.error);
                  }
            }
      });
  
break;
case 2:
  jQuery.ajax
    ({
      type: "POST",
      url: 'movie.php',
      dataType: 'json',
      data: {functionname: 'getMovie', arguments: [x,y]},

      success: function (obj, textstatus) {
                  if( !('error' in obj) ) {
                      movieVariable = obj.result;
                      console.log(movieVariable);
                      var poster = movieVariable.substring(8+movieVariable.search("Poster: "),movieVariable.length);
                      movieVariable = movieVariable.substring(0,movieVariable.search("Poster:"));

                      document.getElementById("insert_here").innerHTML += "<li class='other'><div class='msg'><div class='user'>Bot<span class='range admin'>Admin</span></div><p><img src="+poster +" alt='Poster'></p><time name='time'></time></div></li><li class='other'><div class='msg'><div class='user'>Bot<span class='range admin'>Admin</span></div><p>"+movieVariable+"</p><time name='time'></time></div></li>";
                      //format output if it's too long
                      
                      Time();
                      setTimeout(scroll, 500);
                                        }
                  else {
                      console.log(obj.error);
                  }
            }
      });
  break;}


}


  function Time() {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
      }
    var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
            var time = document.querySelectorAll('time');
            [].forEach.call(time, function(error) {
              if (error.innerHTML == "") {error.innerHTML = h + ":" + m + ":" + s;}
      ;
      });}

      function scroll() {
     window.scrollTo(0, document.body.scrollHeight);
}
  