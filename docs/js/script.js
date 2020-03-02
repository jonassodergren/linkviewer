//console.clear();

var trace = console.log.bind(console);
var listSelector = "#question-list-container li";


// body scroll

//const bodyScrollLock = require('body-scroll-lock');
//const disableBodyScroll = bodyScrollLock.disableBodyScroll;
//const enableBodyScroll = bodyScrollLock.enableBodyScroll;

//const targetElement = document.querySelector("body");

// 3. ...in some event handler after showing the target element...disable body scroll
//disableBodyScroll(targetElement);

//

//var idx;
//$.getJSON("index.json", function(json) {
//  console.log("start loading index");
//  idx = lunr.Index.load(JSON.parse(json));
//  console.log("finished loading index");
//});

//var idx = lunr(function() {
  // define searchable fields
//  this.ref("id");
//  this.field("title");
//  this.field("body");

//  this.k1(1.3)
//  this.b(0)

  // create list of all searchable entries by reading out the
  // '#question-list-container' and saving it as a list of json objects
  // in this case: {id: , title: , ref: }
//  var documents = htmlElementsToJSON(listSelector, function($element) {
//    var ref = $element.attr("data-question-id"),
//      title = $element.find("h2 a").text(),
//      body = $element.find("p").text();

//    return { id: ref, title: title, body: body };
//  });


  // adding all entires to lunr
//  documents.forEach(function(doc) {
//    this.add(doc);
//  }, this);
//});


  //Animate loader off screen
  $("#spinner").show();
  $("#link_icon").hide();
  $("#searchterm").attr("placeholder", "Laddar annonslänkar");
  $('#search2').prop('disabled', true);


$(document).on("loadedHtml", function(){


//$( window ).on("load", function() {
        // Handler for .load() called.

        //$(".se-pre-con").fadeOut("slow");
          $("#spinner").hide();
          $("#link_icon").show();
          $("#searchterm").attr("placeholder", "Sök annonslänkar").blur();
          $('#search2').prop('disabled', false);

//});

});

// try

//fetch('data/links_trunc_ndjson2.json.gz').then(function(response) {
//  var reader = response.body.getReader();
//  var bytesReceived = 0;

//  reader.read().then(function processResult(result) {
//    if (result.done) {
//      console.log("Fetch complete");
//      return;
//    }
//    bytesReceived += result.value.length;
//    console.log(`Received ${bytesReceived} bytes of data so far`);

//    var str = String.fromCharCode.apply(null, result.value);
//    var str2 = pako.inflate(result.value, { to: 'string' });

//    return reader.read().then(processResult);
//  });
//});

// Iframe stream hack

// Create an iframe:
//const iframe = document.createElement('iframe');

// Put it in the document (but hidden):
//iframe.style.display = 'none';
//document.body.appendChild(iframe);

// Wait for the iframe to be ready:
//iframe.onload = () => {
  // Ignore further load events:
//  iframe.onload = null;

  // Write a dummy tag:
  //iframe.contentDocument.write('<ul id="links">');

  // Get a reference to that element:
  //const streamingElement = iframe.contentDocument.querySelector('links');

  // Pull it out of the iframe & into the parent document:
  //document.body.appendChild(streamingElement);

//  document.body.getElementById('links')

  // Write some more content - this should be done async:
//  iframe.contentDocument.write('<p>Hello!</p>');

  // Keep writing content like above, and then when we're done:
  //iframe.contentDocument.write('</ul>');
//  iframe.contentDocument.close();
//};

// Initialise the iframe
//iframe.src = '';

// Iframe stream hack

if (navigator.serviceWorker) {
   navigator.serviceWorker.register('/linkviewer/sw.js', {scope: '/linkviewer/'})
 }

// Load links

//console.time("Load links");
// fetch("links.html")
//     .then((response) => response.text())
//     .then((html) => {
//         document.getElementById("links").innerHTML = html;
//         $.event.trigger({
//      type: "loadedHtml",
//      message: "Hello World!",
//      time: new Date()
//     });
//     console.timeEnd("Load links");
//     })
//     .catch((error) => {
//         console.warn(error);
//     });




var idx;
//console.time("Load json file");
//  $.getJSON("data/index2.json", function(json) {
    //console.log(json);
//    console.time("Load json");
//    idx = lunr.Index.load(json);
//    console.timeEnd("Load json");
//  });
//  console.timeEnd("Load json file");



//
function htmlElementsToJSON(listSelector, unmarschallFunction) {
  // add the list elements to lunr
  var qs = $(listSelector);
  var entries = [];
  for (var i = 0; i < qs.length; i++) {
    var $q = $(qs[i]);
    entries.push(unmarschallFunction($q));
  }
  return entries;
}

function search(searchTerm) {
  var results = idx.search("title:"+searchTerm);

  // reset(hide) all entries
  $(listSelector).removeClass("show");

  var container = document.getElementById('links');

//  for (var i = 0; i < results.length; i++) {
for (var i = results.length-1; i>0; i--) {
    var result = results[i];
    //console.log(result);
  //  $(listSelector + "[data-question-id=" + result.ref + "]").addClass("show");
   var li = $("#"+result.ref);
   container.prepend( li[0] );
   $("#"+result.ref).addClass("show");
  }
}

function showAll(searchTerm) {
  $(listSelector).addClass("show");
}

//$("#searchterm").on("search paste keyup", function(event) {
//  var st = $(this).val();
//
//  if (st.length === 0) {
//    showAll();
//  } else {
//    // make it async, otherwise the keyboard input is interrupted
//    setTimeout(function() {
//      search(st);
//    }, 100);
//  }
//});

//$("#searchterm").on("keydown", function(event) {
//  var st = $(this).val();
//
//  if(event.which == 13)
//    search(st);
//
//});

// and show all results when clicking this button
$(".all").click(function() {
  showAll();
});

//$("#search2").click(function() {
//  search($("#searchterm").val());
//});

$("#search2").click(function(event) {
  console.time("search");
    search($("#searchterm").val());
    console.timeEnd("search");
  //  btnMostrarSeccion($(this));
    event.preventDefault();
//    search($("#searchterm").val());
})
