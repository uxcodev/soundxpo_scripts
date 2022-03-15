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


//temporarily allow anyone to submit changes 
$(".section__artist__edit").hide();
$(".btn__artist__edit").click(function () {
  $(".section__artist__view").hide();
  $(".section__artist__edit").show();
});

let getUrlParameter = function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

$(document).ready(function () {

  let create = getUrlParameter('c');
  let artist_id = getUrlParameter('id');

  console.log("artist_id: " + artist_id)
  console.log("create: " + create)

  if (artist_id) {
    $("#artist_ID").val(artist_id)
  }
  if (create == 1) {
    $(".section__artist__view").hide();
    $(".section__artist__edit").show();
  }
  if (memberstack_ID == "{{ wf {& quot;path&quot;:&quot;member-id&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}") {
    $(".btn__artist__edit").show()
    $(".btn__artist__edit").click(function () {
      $(".section__artist__view").hide();
      $(".section__artist__edit").show();
    });
  }
  else {
    $(".btn__artist__edit").hide()
  }

  // Populate the form with current data

  var cms__genres = []

  $(".cms__genre").each(function (i, item) {
    var genre = $(this).html();
    cms__genres.push(genre);
  });

  var cms__tags = []

  $(".cms__tag").each(function (i, item) {
    var tag = $(this).html();
    cms__tags.push(tag);
  });

  $(".cb__genre").each(function (i, item) {
    var genre = $(this).next().text();
    if ($.inArray(genre, cms__genres) > -1) {
      $("#" + item.id).prop('checked', true);
    } else {
    }
  });

  var cms__type = $(".cms__type").text();
  if (cms__type == "Producer") {
    $(".rb__producer").prop("checked", true);
  } else {
    $(".rb__dj").prop("checked", true);
  }

  var cms__gender = $(".cms__gender").text();
  $(".rb__gender").each(function (i, item) {
    var gender = $(this).next().text();
    if (gender == cms__gender) {
      $("#" + item.id).prop("checked", true);
    }
  });
});

function addGenres() {
  let checked = [];
  $("#subgenreslist").val("");
  $(".cb__genre:checked").each(function (index, element) {
    let id = $(element).data('id')
    //checked.push(`"${id}"`)
    checked.push(id)
  })
  let list = checked
  //$("#subgenreslist").val(list)
  $("#subgenreslist").val(checked)
}

function addTags() {
  $(".cms__tag").each(function (index, element) {
    text = $("#tags").val()
    if (text != "") {
      comma = ", "
    } else {
      comma = ""
    }
    addtag = $(this).html()
    $("#tags").val(text + comma + addtag)
  })
}
$(document).ready(function () {
  addGenres()
  addTags()
});


Webflow.push(function () {
  // Disable submitting form fields during development
  $('form').submit(function () {
    console.log('Form submissions have been disabled during development.');
    return false;
  });
});



