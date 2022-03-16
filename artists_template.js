$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js");
$.getScript("https://malsup.github.io/jquery.form.js");

let apiURL = "https://api.soundxpo.com"
// let apiURL = "http://localhost:8080"

function now() {
  return new Date($.now()).toJSON().replace(/[-:.TZ]/g, '');
}

function post(url, data, callback, callback_error) {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (res, status, error) {
      callback(res.message)
    },
    error: function (xhr, status, error) {
      callback_error(xhr.responseText)
    }
  });
}

function convertFormToJSON(form) {
  var array = form.serializeArray();
  var json = {};
  $.each(array, function () {
    json[this.name] = this.value || "";
  });
  return json;
}


function createdEmbedForm() {
  $('#embedcode').blur(parseEmbed)
  let form__addembed = $('#embedform');
  let add__addembed = $('.btn__addembed');
  let cancel__addembed = $('.btn__addembed__cancel');
  form__addembed.removeClass("w-form");
  form__addembed.hide();

  add__addembed.click(function () {
    form__addembed.show();
    add__addembed.hide();
  })

  cancel__addembed.click(function () {
    form__addembed.hide();
    add__addembed.show();
  })

  //TEMP - populate form
  // $('#embedcode').val('<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1172670976&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/monikafasula" title="Monika Fasula" target="_blank" style="color: #cccccc; text-decoration: none;">Monika Fasula</a> · <a href="https://soundcloud.com/monikafasula/el-progre" title="El Progre" target="_blank" style="color: #cccccc; text-decoration: none;">El Progre</a></div>')

  function parseEmbed() {
    var embed = $('#embedcode').val()
    var width = embed.split('width="').pop().split('\"')[0];
    var height = embed.split('height="').pop().split('\"')[0];

    var s = ""
    if (~embed.indexOf("soundcloud")) { s = "soundcloud" }
    if (~embed.indexOf("spotify")) { s = "spotify" }
    if (~embed.indexOf("bandcamp")) { s = "bandcamp" }

    var site = s

    $('#width').val(width)
    $('#height').val(height)
    $('#site').val(site)

  };

  /* ADD EMBED - API */
  form__addembed.submit(function (e) {
    parseEmbed()

    let getNow = now()
    formData = convertFormToJSON(form__addembed);

    let data = {
      "embed_collection_id": "621689fef870c6ea77dfc7d6",
      "artist_collection_id": "620536720c96daeda710d568",
      "artist_id": artist_id,
      "fields": {
        "name": getNow,
        "slug": getNow,
        "_archived": "false",
        "_draft": "false",
        "artist-id": artist_slug,
        "site": formData.site,
        "height": formData.height,
        "width": formData.width,
        "embed-code": formData.embedcode
      }
    }

    e.preventDefault();
    form__addembed = $(e.target);

    var url = `${apiURL}/webflow/add-embed`;

    let callback = () => {
      window.location.reload();
    }
    post(url, data, callback);
  });

  // DELETE EMBED
  $('.btn__embed__delete').click(function () {

    var url = `${apiURL}/webflow/delete-embed-slug`;

    let data = {
      "slug": $(this).val(),
      "artist_id": artist_id,
      "collection_id": "621689fef870c6ea77dfc7d6",
      "artist_cid": "620536720c96daeda710d568"
    }
    let callback = () => {
      window.location.reload();
    }
    post(url, data, callback);
  })

}

createdEmbedForm()


/* EDIT PROFILE - API */
let form__editprofile = $('#form__editProfile');
form__editprofile.submit(function (e) {

  $("#artist_ID").val(artist_id)
  $("#memberstack_ID").val(member_id)

  let formData = ""
  let data = ""
  let getNow = now()

  formData = convertFormToJSON(form__editprofile);
  data = formData

  e.preventDefault();
  form__editprofile = $(e.target);

  var url = `${apiURL}/webflow/edit-profile`;

  let success = (msg) => {
    window.location.replace(`/artists/${data.slug}`);  // ENABLE FOR PROD
    // window.location.reload();
  }
  let fail = (err) => {
    console.log(err)
    $('.msg__error').show()
    if (err.indexOf('slug')) {
      $('.msg__error__slug').text('This username is already taken')
      $('.msg__error__slug').show()
      $('html, body').animate({
        scrollTop: $("#slug").offset().top - 80
      }, 300);
    }
    console.log(`Error: ${err}`)
  }
  post(url, data, success, fail);
});

$(".btn__claim__profile").click(function () {


  let url = `${apiURL}/webflow/claim-profile`;

  let data = {
    collection_id: "620536720c96daeda710d568",
    member_id: member_id,
    artist_id: artist_id
  }
  let callback_error = function (err) {
    console.log(err)
  }
  let callback = function (msg) {
    window.location.reload();
  }
  post(url, data, callback, callback_error);
})

function getArtistId() {

  let url = `${apiURL}/webflow/get-id-by-slug`;

  let data = {
    collection_id: "620536720c96daeda710d568",
    slug: artist_slug
  }
  let success = (id) => {
    artist_id = id
    updateArtistId(id)
  }

  let fail = (err) => {
    console.log(err)
  }
  post(url, data, success, fail);
}

function updateArtistId(id) {

  let url = `${apiURL}/webflow//update-artist-id`
  let data = {
    collection_id: "620536720c96daeda710d568",
    artist_id: id
  }
  let success = (msg) => {
  }
  let fail = (err) => {
    console.log(err)
  }
  post(url, data, success, fail);
}

$(".btn__get__id").click(function () {
  getArtistId()
})

if (!artist_id) {
  getArtistId()
}

$('.bio__wrapper').find(".bio__more").on('click', function (e) {
  e.preventDefault();
  this.expand = !this.expand;
  $(this).html(this.expand ? "- less" : "+ more");
  $(this).closest('.bio__wrapper').find('.small, .big').toggleClass('small big');
});


function setBioMore() {

  let bio = $('.bio').text()
  let bh = $('.bio').height()
  let mh = $('.small').height()
  if (bh <= mh) {
    $('.bio__more').hide()
    $('.bio__mask').hide()
  }
}

setBioMore()

if (artist_member_id && !(member_id > 1)) {
  $(".btn__claim__profile").show()
} else {
  $(".btn__claim__profile").hide()
}

//temporarily allow anyone to submit changes 
$(".section__artist__edit").hide();
$(".btn__artist__edit").click(function () {
  $(".section__artist__view").hide();
  $(".section__artist__edit").show();
});

//set gender default to 'Unspecified'
$("input[name=Gender][value=Unspecified]").prop('checked', true);

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

  let url__create = getUrlParameter('c');
  let url__artist_id = getUrlParameter('id');

  if (url__artist_id && url__create) {

    // the artist_id variable will be added to the form input on submit
    artist_id = url__artist_id

  }
  else if (!artist_id || artist_id === "new") {

    // if new artist get ID from the CMS and assign to artist_id
    getArtistId()
  }

  if (url__create == 1) {
    $(".section__artist__view").hide();
    $(".section__artist__edit").show();
  }
  if (member_id === artist_member_id) {
    $(".btn__addembed").show()
    $(".btn__artist__edit").show()
    $(".btn__artist__edit").click(function () {
      $(".section__artist__view").hide();
      $(".section__artist__edit").show();
    });
  }
  else {
    $(".btn__addembed").hide()
    $(".btn__artist__edit").hide()
  }

  // Claim profile

  if (artist_member_id.length < 8 && member_id) {
    $(".btn__claim__profile").show()
  } else {
    $(".btn__claim__profile").hide()
  }

  // Populate the form with current data

  var cms__genres = []

  $(".cms__genre").each(function (i, item) {
    var genre = $(this).text();
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
  }
  if (cms__type == "DJ & Producer") {
    $(".rb__djproducer").prop("checked", true);
  }
  else {
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
  let checked = document.getElementById('active').checked
  if (active && !checked) {
    $(".toggle").click()
  }
  addGenres()
  addTags()
});


Webflow.push(function () {
  // Disable submitting form fields during development
  $('form').submit(function () {
    return false;
  });
});


