$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js");
$.getScript("https://malsup.github.io/jquery.form.js");

let apiURL = "https://api.soundxpo.com"
// let apiURL = "http://localhost:8080"

function now() {
  return new Date($.now()).toJSON().replace(/[-:.TZ]/g, '');
}

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

$(".btn__artist").click(function () {

  let url = `${apiURL}/webflow/create-artist`;

  // let data = {
  //   collection_id: "620536720c96daeda710d568",
  //   slug: memberstack_ID,
  //   fields: {
  //     "artist_id": "new",
  //     "member-id": "memberstack_ID",
  //     "name": "memberstack_member.name"
  //   }
  // }

  let data = {
    collection_id: "620536720c96daeda710d568",
    fields: {
      "slug": memberstack_ID,
      "hide": true,
      "member-id": memberstack_ID,
      "name": memberstack_member.name,
      "_draft": false,
      "_archived": false
    }
  }

  let callback = function (msg) {
    let id = msg.message
    console.log("callback: " + id)
    window.location.href = `/artists/${memberstack_ID}?c=1&id=${id}`;
  }
  post(url, data, callback);
});


//window.location.replace("/artists/" + id + "?c=1");


