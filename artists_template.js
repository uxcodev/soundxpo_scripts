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

    // console.log(width)
    // console.log(height)
    // console.log(site)

    $('#width').val(width)
    $('#height').val(height)
    $('#site').val(site)

    // console.log("parseEmbed");
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
  // var url = `${localURL}/webflow/edit-profile`;

  let success = (msg) => {
    window.location.replace(`/artists/${data.slug}`);
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
  // console.log(member_id)
  // console.log(artist_id)
  // console.log(artist_slug)

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

  let url = `${apiURL}/webflow/get-id-by-slug`

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
  // console.log("getArtistId()")
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

if (artist_member_id && member_id < 1) {
  console.log("unclaimed profile")
  $(".btn__claim__profile").show()
} else {
  $(".btn__claim__profile").hide()
}

console.log("artists_template.js")