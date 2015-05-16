$(document).ready(function(){
  $('#user-search').keydown(function(e) {
    var key = e.which;
    var newUser = { name : $('#user-search').val() }
    if (key == 13) {
      $.ajax({
        type: "POST",
        url: "/twitter",
        data: newUser,
        dataType: 'json',
        success: function(data) {
          var tweetArray = data.info[0]
          var currentUser = data.info[1]
          updateProfile(currentUser,tweetArray)
        }
      });
    }
  });

  function updateProfile(user,tweets) {
    for (prop in user) {
      var idk = $("." + prop)
      if (idk.length == 1) {
        if (prop === "prof_pic") {
          $(idk[0].firstChild).attr("src",user[prop]);
        }else{
          idk[0].innerHTML = user[prop];
        }
      }else{
        if (prop === "background") {
          $('.jumbotron').css('background-image','url(' + user[prop] + ')')
        }else{
          $.each( idk, function( key, value ) {
            value.innerHTML = user[prop];
          });
        }
      }
    }
  }
});
