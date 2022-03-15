$.getScript("https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js");
$.getScript("https://malsup.github.io/jquery.form.js");

// put this in site head code
now = function() {
    return new Date($.now()).toJSON().replace(/[-:.TZ]/g,'');
  }


console.log("addembed.js");

function parseEmbed () {
    var embed = $('#embedcode').val()
    var width = embed.split('width="').pop().split('\"')[0];
    var height = embed.split('height="').pop().split('\"')[0];
  
    var s = ""
    if (~embed.indexOf("soundcloud")) { s = "soundcloud" }
    if (~embed.indexOf("spotify")) { s = "spotify" }
    if (~embed.indexOf("bandcamp")) { s = "bandcamp" }
    
    var site = s
    var count = $('.embed__count').length;
    $('#date').append(now());

    console.log(width)
    console.log(height)
    console.log(site)
    console.log(count)
    console.log("now: " + now())
  
    $('#width').val(width)
    $('#height').val(height)
    $('#site').val(site)
    $('#slug').val(site + count)
  
    console.log("parseEmbed");
};

$('#embedcode').blur(parseEmbed)


var form1 = $('#embedform');
var add1 = $('.btn__addembed');
var cancel1 = $('.btn__addembed__cancel');
var added1 = $('.txt__embed__added');

form1.removeClass("w-form");
//form1.hide();



add1.click(function() {
  form1.show();
  add1.hide();
})

cancel1.click(function() {
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
    var action = "https://hooks.zapier.com/hooks/catch/11910368/bi2r71w/";
    console.log(data);
    $.ajax({
      url: action,
      method: "POST",
      data: data, //JSON.stringify(data),
      success: function (data) {
        console.log(data.status)
        console.log(data)
        // form1.hide();
        // add1.show();
        // added1.show();
      },
      error: function () {console.log('nope')},
    });
  });


  