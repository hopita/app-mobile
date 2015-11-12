$(document).ready(function() {
  $(document).on("pageshow", "[data-role='page']", function() {
    if ($($(this)).hasClass("header_default")) {
      $('<header data-theme="b" data-role="header"><h1></h1><a href="#" class="ui-btn-left ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-back" data-rel="back">Back</a><a href="#" class="ui-btn-right ui-btn ui-btn-inline ui-btn-icon-notext ui-mini ui-corner-all ui-icon-info">Info</a></header>')
        .prependTo( $(this) )
        .toolbar({ position: "fixed" });
        $("[data-role='header'] h1").text($(this).jqmData("title"));
    }
  });   
});

function listPosts(data) {
  var output = '<form class="ui-filterable"><input id="searchposts" data-type="search"></form>';
  output += '<ul data-role="listview" "data-filter="true" data-input="searchposts">';
  $.each(data.posts, function(key, val){
  	//Voy a anular los link del excerpt para que no haya conflicto, ya que todo el li esta dentro de un a
  	 var tempDiv = document.createElement("tempDiv");
  	 tempDiv.innerHTML = val.excerpt;
  	 $("a", tempDiv).remove();
  	 var excerpt = tempDiv.innerHTML;
  	 
  	 output += '<li>';
  	 output += '<a href="#blogpost" onclick="showPost(' + val.id + ');">';
  	 output += (val.thumbnail) ?
  	 '<img src="' + val.thumbnail + '">':
  	 '<img src="images/viewsourcelogo.png">';
  	 output += '<h2>' + val.title + '<h2>';
  	 output += '<h2>' + excerpt + '<h2>';
  	 output += '</li>';
  });
  output +='</ul>';
  $('#postlist').html(output);
}

function showPost(id){
	$.getJSON('http://magdabandera.com/category/bitacora/?json=get_post&post_id=' + id + '&callback=?', function(data){
		var output = '<h3>' + data.post.title + '</h3>';
		output += data.post.content ;
		$('#mypost').html(output);
	});
}
