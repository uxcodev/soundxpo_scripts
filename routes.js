$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js");
$.getScript("https://malsup.github.io/jquery.form.js");

let apiURL = "https://api.soundxpo.com"
// let apiURL = "http://localhost:8080"

function post(url, data, callback) {
  $.ajax({
    type: "POST",
    url: url,
    data: JSON.stringify(data),
    contentType: "application/json",
    success: callback
  });
}

let short_url = $(location).attr("href").split(".com/").pop();

var url = `${apiURL}/webflow/check-short-url`;
var data = {
  collection_id: "620536720c96daeda710d568",
  slug: short_url
}
let success = () => {
  window.location.replace(`/artists/${short_url}`);
}
post(url, data, success);

