(function() {
function streamJSON(url, callback) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var pos = 0;

    function processChunk(chunk) {
      try {
        var data = JSON.parse(chunk);

      }
      catch (err) {
        reject(Error('Error parsing: ' + chunk));
        xhr.abort();
        return;
      }
//var node = document.createRange().createContextualFragment(data.item);
      callback(data.item);
    }



    xhr.onprogress = function() {
      var parts = xhr.response.slice(pos).split('\n');

      parts.slice(0, -1).forEach(function(part) {
        processChunk(part);
        pos += part.length + 1;
      });
    };

    xhr.onload = function() {
      var chunk = xhr.response.slice(pos);
      if (chunk) processChunk(chunk);
      resolve();
      $.event.trigger({
      type: "loadedHtml",
      message: "Hello World!",
      time: new Date()
     });
    };


    xhr.onerror = function() {
      reject(Error('Connection failed'));
    };

    xhr.responseType = 'text';
    xhr.open('GET', url);
    xhr.send();
  });
}


//var content = document.querySelector('.content');

  //var container = content.querySelector('.js-discussion');
  var container = document.getElementById('links');

  streamJSON('links_trunc_ndjson2.json', function(comment) {
    //var div = document.createElement('div');
    //div.className = comment.class;
    //div.innerHTML = comment.html;
    //container.appendChild(div); // html = $.parseHTML( str )
    //container.appendChild(comment);
    //comment.appendTo(container);
    container.insertAdjacentHTML('beforeend', comment);
  });



})();
