console.clear();
var trace = console.log.bind(console);
var listSelector = "#question-list-container li";


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
   navigator.serviceWorker.register('sw.js', {scope: '/'})
 }


$(function(){
  $("#links").load("links.html");
});


var idx;
//$.getJSON("index.json", function(json) {
//  //console.log(json);
//  idx = lunr.Index.load(json);
//  localforage.setItem('search_index', json, function (err) {
//    console.log(err);
//  });
//});

//localforage.getItem('search_index3').then(function(value) {
    // This code runs once the value has been loaded
    // from the offline store.
//    console.time("Load DB");
//    idx = lunr.Index.load(value);
//    console.timeEnd("Load DB");
    //console.log(value);
//}).catch(function(err) {
  $.getJSON("index.json", function(json) {
    //console.log(json);
    idx = lunr.Index.load(json);
    localforage.setItem('search_index3', json, function (err) {
      console.log(err);
    });
  });
//    console.log(err);
//});


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

  for (var i = 0; i < results.length; i++) {
    var result = results[i];
  //  $(listSelector + "[data-question-id=" + result.ref + "]").addClass("show");
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
