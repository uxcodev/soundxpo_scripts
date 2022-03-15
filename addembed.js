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
    success: function (xhr, status, error) {
      callback(xhr.responseText)
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
  $('#embedcode').val('<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1172670976&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/monikafasula" title="Monika Fasula" target="_blank" style="color: #cccccc; text-decoration: none;">Monika Fasula</a> · <a href="https://soundcloud.com/monikafasula/el-progre" title="El Progre" target="_blank" style="color: #cccccc; text-decoration: none;">El Progre</a></div>')

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
      "artist_id": $(this).data('artistid'),
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
    $('.msg__error').show()
    if (err.indexOf('slug')) {
      $('.msg__error__slug').text('This username is already taken')
      $('.msg__error__slug').show()
      $('html, body').animate({
        scrollTop: $("#slug").offset().top - 80
      }, 300);
    }
    // console.log(`the error is ${err}`)
  }
  post(url, data, success, fail);
});






