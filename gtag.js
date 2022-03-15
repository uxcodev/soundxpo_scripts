$( "#btn_follow" ).click(function() {
  var type = $(this).data('type');   
  var name = $(this).data('name');
  console.log(type + ", " + name);
  gtag("event", "follow_clicked", {"event-type": type ,"event-name": name})
});