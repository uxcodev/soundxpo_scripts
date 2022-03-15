$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js");
$.getScript("https://malsup.github.io/jquery.form.js");

console.log("addembed.js");

function parseEmbed() {
  var embed = $('#embedcode').val()
  var width = embed.split('width="').pop().split('\"')[0];
  var height = embed.split('height="').pop().split('\"')[0];

  var s = ""
  if (~embed.indexOf("soundcloud")) { s = "soundcloud" }
  if (~embed.indexOf("spotify")) { s = "spotify" }
  if (~embed.indexOf("bandcamp")) { s = "bandcamp" }

  var site = s

  console.log(width)
  console.log(height)
  console.log(site)

  $('#width').val(width)
  $('#height').val(height)
  $('#site').val(site)

  console.log("parseEmbed");
};

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

form1.submit(function (e) {
  e.preventDefault();
  form1 = $(e.target);
  var data = convertFormToJSON(form1);
  var action = "https://hooks.zapier.com/hooks/catch/11910368/bite4tr";
  console.log(data);
  $.ajax({
    url: action,
    method: "POST",
    data: data, //JSON.stringify(data),
    success: function () {
      form1.hide();
      add1.show();
      added1.show();
    },
    error: function () { console.log('nope') },
  });
});

/*
$('.btn__embed__delete').click(function () {
  let slug = $(this).data('slug')
  let artist_id = $(this).data('artist_id')
  // let url = "https://edm-vyshj.ondigitalocean.app/webflow/delete-embed-slug"
  // let url = "http://localhost:8080/webflow/delete-embed-slug"
  let url = "http://localhost:8080/webflow/delete-embed-slug"
  // let body = {
  //   "slug": slug,
  //   "collection_id": "621689fef870c6ea77dfc7d6",
  //   "artist_id": artist_id,
  //   "artist_cid": "620536720c96daeda710d568"
  // }

  let body = {
    "slug": "1234",
    "collection_id": "621689fef870c6ea77dfc7d6",
    "artist_id": "62168f2c973220d2b668e412",
    "artist_cid": "620536720c96daeda710d568"
  }

  $.ajax({
    url: url,
    method: "POST",
    data: { msg: "hello" }, //JSON.stringify(data),
    success: function () {
      console.log("success!")
    },
    error: function () { console.log('nope') },
  });
  console.log(slug)
})
*/
/* 

// THIS ONE HAS THE CORRECT FORM FIELDS, BUT NOT WORKING YET

$('.btn__embed__delete').click(function () {
  let slug = $(this).data('slug')
  let artist_id = $(this).data('artist_id')
  let url = "https://edm-vyshj.ondigitalocean.app/webflow/delete-embed-slug"

  let body = {
    "slug": slug,
    "collection_id": "621689fef870c6ea77dfc7d6",
    "artist_id": artist_id,
    "artist_cid": "620536720c96daeda710d568"
  }

  $.post(url, { slug: "1234" })
    .done(function () {
      alert("success");
    })
    .fail(function () {
      alert("error");
    })
  console.log(slug)
})
 */

/*
// WORKS
$('.btn__embed__delete').click(function () {

  let url = "http://localhost:8080/webflow/webflow-test"
  let body = {
    "message": "test"
  }

  let response = $.get(url, body)
    .done(function (r) {
      // alert("success");
      console.log(r.message)
    })
    .fail(function () {
      alert("error");
    })
})
 */
// WORKS
$('.btn__embed__delete').click(function () {
  let url = "https://edm-vyshj.ondigitalocean.app/webflow/delete-embed-slug"
  let data = {
    "slug": "1234",
    "collection_id": "621689fef870c6ea77dfc7d6",
    "artist_id": "62168f2c973220d2b668e412",
    "artist_cid": "620536720c96daeda710d568"
  }
  post(url, data);
})

function post(url, data) {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: function (data) {
      console.log(JSON.stringify(data))
    },
    error: function (err) {
      console.log(err);
    }
  });
}

// var form2 = $('#deletEembed');
// form2.removeClass("w-form");

// function convertFormToJSON(form) {
//   var array = $(form2).serializeArray();
//   var json = {};
//   $.each(array, function () {
//     json[this.name] = this.value || "";
//   });
//   return json;
// }


// form2.submit(function (e) {
//   e.preventDefault();
//   form2 = $(e.target);
//   var data = {
//     "slug": "12345",
//     "collection_id": "621689fef870c6ea77dfc7d6",
//     "artist_id": "62168f2c973220d2b668e412",
//     "artist_cid": "620536720c96daeda710d568"
//   }
//   var action = "http://localhost:8080/webflow/delete-embed-slug";
//   $.ajax({
//     url: action,
//     type: 'post',
//     method: "POST",
//     processData: "false",
//     dataType: "json",
//     contentType: "application/json",
//     data: { msg: "hey" },
//     success: function () {
//       console.log("success")
//     },
//     error: function () { console.log('nope') },
//   });
// });
