$(document).ready(function() {

  // Sets triggers for ajax request
  $('#user-search').keydown(function(e) {
    var key = e.which;
    if (key == 13) {
      e.preventDefault()
      loadingModal()
      var newUser = {
        name: $('#user-search').val()
      }
      retrieveProfile(newUser)
    }
  });

  $('#search-button').click(function(e) {
    e.preventDefault()
    loadingModal()
    var newUser = {
      name: $('#user-search').val()
    }
    retrieveProfile(newUser)
  });

  // Creates loading bar modal while request is sent
  function loadingModal(){
    var $modal = $('.js-loading-bar'),
    $progress = $modal.find('.progress-bar');
    $modal.modal('show');
    $progress.addClass('animate');
    setTimeout(function() {
      $progress.removeClass('animate');
      $modal.modal('hide');
    }, 1000);
  }

  function retrieveProfile(newUser) {
    $.ajax({
      type: 'POST',
      url: '/twitter',
      data: newUser,
      dataType: 'json',
      success: function(data) {
        var tweetArray = data.info[0]
        var currentUser = data.info[1]
        updateProfile(currentUser, tweetArray)
      },
      error: function(){
        generateError(newUser)
      }
    });
  }

  // Adds values to profile and tweets
  function updateProfile(user, tweets) {
    clearPictures()
    for (prop in user) {
      var userProperty = $('.' + prop)
      if (userProperty.length == 1) {
        if (prop === 'prof_pic') {
          $(userProperty[0].firstChild).attr('src', user[prop]);
        } else {
          userProperty[0].innerHTML = user[prop];
        }
      } else {
        if (prop === 'background') {
          $('.userProfile').css('background-image', 'url(' + user[prop] + ')')
        } else {
          $.each(userProperty, function(key, value) {
            value.innerHTML = user[prop];
          });
        }
      }
    }

    $.each(tweets, function(key, value) {
      var $tweetDiv = $('#tweet' + (key + 1))
      $.each($tweetDiv[0].children, function(prop, val) {
        tweetVal = val.className
        if (tweetVal !== 'username') {
          if (tweetVal === 'tweet_pic') {
            if (value[tweetVal] !== null) {
              var $imgDiv = val.children[0]
              $(val).attr('value', '1')
              $($imgDiv).attr('src', 'http://' + value[tweetVal].host + value[tweetVal].path)
            }
          } else {
            val.innerHTML = value[tweetVal];
          }
        }
      });
    });
  }

  // Generates error if user is not found
  function generateError(user) {
    $('.form-control')[0].value = ''
    $('.failed-request')[0].innerHTML = user.name + ' is not a valid user'
    $('.failed-request').fadeIn(200);
    $('.failed-request').fadeToggle(4000);
  }

  // Need to manually reset links or valid links persist and display
  function clearPictures() {
    $.each($('.tweet_pic'), function(prop, val) {
      $(val.firstChild).attr('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=')
    })
    return false
  }

  // Sort functions
  function sortByDate(elements, order) {
    var arr = [];
    elements.each(function() {
      var obj = {},
      $els = $(this),
      $el = $els[0]
      $created_div = $($el.children)
      time = $created_div[5].innerHTML,
      date = new Date(time),
      timestamp = date.getTime();
      obj.html = $created_div[5].parentElement;
      obj.time = timestamp;

      arr.push(obj);
    });

    var sorted = arr.sort(function(a, b) {
      if (order == 'ASC') {
        return a.time > b.time;
      } else {
        return b.time > a.time;
      }

    });
    return sorted;
  };

  function sortByRetweets(elements, order) {
    var arr = [];
    elements.each(function() {
      var obj = {},
      $els = $(this),
      $el = $els[0]
      $retweetDiv = $($el.children)
      $retweetCount = $retweetDiv[2].innerHTML,
      rtNum = parseInt($retweetCount),
      obj.html = $retweetDiv[2].parentElement;
      obj.retweets = rtNum;

      arr.push(obj);
    });

    var sorted = arr.sort(function(a, b) {
      if (order == 'ASC') {
        return a.retweets > b.retweets;
      } else {
        return b.retweets > a.retweets;
      }

    });
    return sorted;
  };

  function sortByPic(elements, order) {
    var arr = [];
    elements.each(function() {
      var obj = {},
      $els = $(this),
      $el = $els[0].children[4];
      $picVal = $($el).attr('value')
      hasPic = parseInt($picVal),
      obj.html = $el.parentElement;
      obj.pic = hasPic;

      arr.push(obj);
    });

    var sorted = arr.sort(function(a, b) {
      if (order == 'ASC') {
        return a.pic > b.pic;
      } else {
        return b.pic > a.pic;
      }

    });
    return sorted;
  };

  // Set listeners for sorting
  $(function() {
    $twee = $('.tweet');

    $('#created').click(function() {
      orderEls('#created', 'newer', 'older', sortByDate)
    });

    $('#rts').click(function() {
      orderEls('#rts', 'highest', 'lowest', sortByRetweets)
    });

    $('#anyPics').click(function() {
      orderEls('#anyPics', 'yes', 'no', sortByPic)
    });

    function orderEls(div, highVal, lowVal, sortFunction) {
      $divsOrder = $(div).attr('value');
      if ($divsOrder == highVal) {
        var elements = sortFunction($twee, 'ASC');
        $(div).attr('value', lowVal);
      } else {
        var elements = sortFunction($twee, 'DESC');
        $(div).attr('value', highVal);
      }
      for (var i = 0; i < elements.length; ++i) {
        $('#mainTweetList').append($(elements[i].html))
      }
      return false
    }
  });

});
