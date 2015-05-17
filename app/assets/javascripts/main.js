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


  $.sortByDate = function( elements, order ) {
    console.log('hisort');
    var arr = [];
    elements.each(function() {
      var obj = {},
      $els = $(this),
      $el = $els[0]
      $created_div = $($el.children)
      time = $created_div[4].innerHTML,
      date = new Date(time),
      timestamp = date.getTime();
      obj.html = $created_div[4].parentElement;
      obj.time = timestamp;      
      arr.push( obj );
    });

    var sorted = arr.sort(function( a, b ) {
      if( order == "ASC" ) {
        return a.time > b.time;
      } else {
        return b.time > a.time;
      }
    });

    return sorted;
  };

  $(function() {
    var $newer = $( "#newer" ),
    $older = $( "#older" ),
    $content = $( "#sliderList" ),
    $elements = $( ".tweet" );

    $older.click(function() {
      var elements = $.sortByDate( $elements, "ASC" );
      for( var i = 0; i < elements.length; ++i ) {
        $('#sliderList').append($(elements[i].html))
      }
      return false;
    });

    $newer.click(function() {
      var elements = $.sortByDate( $elements, "DESC" );
      for( var i = 0; i < elements.length; ++i ) {
        $('#sliderList').append($(elements[i].html))
      }
      return false;
    });
  });

});
