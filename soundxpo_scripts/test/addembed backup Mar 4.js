$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js");
$.getScript("https://malsup.github.io/jquery.form.js");

console.log("addembed.js");

function now() {
  return new Date($.now()).toJSON().replace(/[-:.TZ]/g, '');
}

function parseEmbed() {
  var embed = $('#embedcode').val()
  var width = embed.split('width="').pop().split('\"')[0];
  var height = embed.split('height="').pop().split('\"')[0];

  var s = ""
  if (~embed.indexOf("soundcloud")) { s = "soundcloud" }
  if (~embed.indexOf("spotify")) { s = "spotify" }
  if (~embed.indexOf("bandcamp")) { s = "bandcamp" }

  var site = s

  // console.log(width)
  // console.log(height)
  // console.log(site)

  $('#width').val(width)
  $('#height').val(height)
  $('#site').val(site)

  // console.log("parseEmbed");
};


function post(url, data, cb) {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: cb,
    error: function (err) {
      console.log(err);
    }
  });
}

$('#embedcode').blur(parseEmbed)


var form1 = $('#embedform');
var add1 = $('.btn__addembed');
var cancel1 = $('.btn__addembed__cancel');
var added1 = $('.txt__embed__added');
form1.removeClass("w-form");
form1.hide();

add1.click(function () {
  form1.show();
  add1.hide();
})

cancel1.click(function () {
  form1.hide();
  add1.show();
})


function convertFormToJSON(form) {
  var array = $(form1).serializeArray();
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  return json;
}


//TEMP - populate form
$('#embedcode').val('<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1172670976&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/monikafasula" title="Monika Fasula" target="_blank" style="color: #cccccc; text-decoration: none;">Monika Fasula</a> · <a href="https://soundcloud.com/monikafasula/el-progre" title="El Progre" target="_blank" style="color: #cccccc; text-decoration: none;">El Progre</a></div>')

/* ADD EMBED - API */
form1.submit(function (e) {
  parseEmbed()

  let getNow = now()
  formData = convertFormToJSON(form1);

  let data = {
    "embed_collection_id": "621689fef870c6ea77dfc7d6",
    "artist_collection_id": "620536720c96daeda710d568",
    "artist_id": formData.artist_ID,
    "fields": {
      "name": getNow,
      "slug": getNow,
      "_archived": "false",
      "_draft": "false",
      "artist-id": formData.artist_ID,
      "site": formData.site,
      "height": formData.height,
      "width": formData.width,
      "embed-code": formData.embedcode
    }
  }

  e.preventDefault();
  form1 = $(e.target);
  // var url = "https://edm-vyshj.ondigitalocean.app/webflow/add-embed";
  var url = "http://localhost:8080/webflow/add-embed";
  let callback = () => {
    window.location.reload();
  }
  post(url, data, callback);
});


// DELETE EMBED
$('.btn__embed__delete').click(function () {

  let url = "http://localhost:8080/webflow/delete-embed-slug";

  let data = {
    "slug": $(this).val(),
    "artist_id": $(this).data('artistid'),
    "collection_id": "621689fef870c6ea77dfc7d6",
    "artist_cid": "620536720c96daeda710d568"
  }
  let callback = () => {
    window.location.reload();
  }
  post(url, data, callback);
})


