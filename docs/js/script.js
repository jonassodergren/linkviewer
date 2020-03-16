//console.clear();

var trace = console.log.bind(console);
var listSelector = "#question-list-container li";

const ssyk_utan_utbildning = [2315,6670,7316,4117,5985,3966,4155,1549,438,1777,7271,257,5852,470,5375,5499,4143,6207,2959,396,2306,397,2250,5044,4126,5830,4332,2289,5357,2284,449,6810,5936,5846,3470,2249,5857,6006,6723,5556,5987,6285,7580,294,4129,472,5718,7535,451,452,5277,5278,474,5684,5419,6343,4890,6012,3726,7017,225,5874,6400,3727,443,5713,5799,455,4133,710,6286,458,446,6970,6684,2155,2275,264,6871,2276,712,721,459,4136,5147,2291,5994,483,2138,2001,398,6211,1063,1005,1119,5663,1268,4163,6389,6761,1094,998,1000,6409,5305,1014,1154,929,1164,1170,4829,5629,4366,2164,7328,5986,5510,297,7018,3473,7113,2881,7501,5258,5418,5907,298,5798,5505,7243,2339,299,2141,1105,7662,866,6342,5597,4891,2675,5555,868,6672,7536,4436,5490,462,5707,7655,6957,1544,4437,5873,5046,7656,2890,300,6787,6209,6165,2312,726,464,7446,6360,886,2152,7468,5377,2233,6794,2673,6013,7160,5875,2495,466,5153,6671,2352,2234,7585,5866,891,2350,468,5302,5263,7317,5797,5984,4177,5624,2345,7119];


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

if (navigator.serviceWorker) {
   navigator.serviceWorker.register('/linkviewer/sw.js', {scope: '/linkviewer/'})
 }


  //Animate loader off screen
  $("#spinner").show();
  $("#link_icon").hide();
  $("#searchterm").attr("placeholder", "Laddar länkar");
  $('#search2').prop('disabled', true);


$(document).on("loadedHtml", function(){


//$( window ).on("load", function() {
        // Handler for .load() called.

        //$(".se-pre-con").fadeOut("slow");
          $("#spinner").hide();
          $("#link_icon").show();
          $("#searchterm").attr("placeholder", "Sök annonslänkar").blur();
          $('#search2').prop('disabled', false);

          // Cache the loaded page
          if (navigator.serviceWorker) {
        //  navigator.serviceWorker.controller.postMessage("CacheIndex");
        }

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
  //var results = idx.search("title:"+searchTerm);
var results = idx.search(searchTerm);

  // reset(hide) all entries
  $(listSelector).removeClass("show");

  var container = document.getElementById('links');

//  for (var i = 0; i < results.length; i++) {
for (var i = results.length-1; i>0; i--) {
    var result = results[i];
    //console.log(result);
  //  $(listSelector + "[data-question-id=" + result.ref + "]").addClass("show");
   var li = $("#"+result.ref);
   var div = li[0];
   container.prepend( div );
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
$("#utan_utbildning").click(function() {
  //showAll();
  var container = document.getElementById('links').children;

  var j = 0;
for (var i = 0; i < container.length; i++) {
  //  console.log(container[i].id); //second console output
  var ssyk = container[i].dataset.ssyk;

  if (ssyk_utan_utbildning.includes(parseInt(ssyk))){
    $("#"+container[i].id).addClass("show");
  j++;
  }
}
console.log("Number of jobs: "+j);

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
