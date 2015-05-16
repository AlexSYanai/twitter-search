$(document).ready(function(){
  $('#user-search').keydown(function(e) {
    var key = e.which;
    var newUser = { name : $('#user-search').val() }
    if (key == 13) {
      $.ajax({
        type: 'POST',
        url: '/twitter',
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
      var userProperty = $("." + prop)
      if (userProperty.length == 1) {
        if (prop === "prof_pic") {
          $(userProperty[0].firstChild).attr("src",user[prop]);
        }else{
          userProperty[0].innerHTML = user[prop];
        }
      }else{
        if (prop === "background") {
          $('.jumbotron').css('background-image','url(' + user[prop] + ')')
        }else{
          $.each( userProperty, function(key,value ) {
            value.innerHTML = user[prop];
          });
        }
      }
    }

    $.each(tweets, function(key,value) {
      var tweetDiv = $(".tweets" + (key + 1))
      $.each(tweetDiv[0].children, function(prop,val) {
        tweetVal = val.className
        if (tweetVal !== "username") {
          val.innerHTML = value[tweetVal];
        }
      });
    });


  }
});
