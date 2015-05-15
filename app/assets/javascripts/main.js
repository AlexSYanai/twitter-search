$(document).ready(function(){
  $('#user-search').keydown(function(e) {
    var key = e.which;
    var newUser = { name : $('#user-search').val() }
    if (key == 13) {
    // console.log(newUser)
      $.ajax({
        type: "POST",
        url: "/twitter",
        data: newUser,
        dataType: 'json',
        success: function(data) { console.log(data) }
      });
    }
  });
});
