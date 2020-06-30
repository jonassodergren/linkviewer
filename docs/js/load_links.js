

function streamJSON(url, callback) {
  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    var pos = 0;

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}


    function processChunk(chunk) {
      try {
      //  var buf = str2ab(chunk);
      //  var compressed = new TextEncoder("utf-8").encode(chunk);
      //  var test = pako.inflate(new Uint8Array(chunk), { to: 'string' });

        var data = JSON.parse(chunk);
        count++;
        //var data3 = JSON.stringify(chunk.slice(9, chunk.length-2));
        //var data2 =  {
        //        "item" : "<li>test</li>"
        //    };
        //var data = JSON.parse(chunk);
        //pako.inflate(request.response, { to: 'string' })
        //var data = JSON.parse(pako.inflate(chunk, { to: 'string' }));

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
      //xhr.response = gzip;
      var chunk = xhr.response.slice(pos);
      if (chunk)
      processChunk(buffer);


      resolve();
      $.event.trigger({
      type: "loadedHtml",
      message: "Hello World!",
      time: new Date()
     });
    };

    xhr.onloadend = function() {
       container.insertAdjacentHTML('beforeend', buf);
    };


    xhr.onerror = function() {
      reject(Error('Connection failed'));
    };

    xhr.responseType = 'text';
    xhr.open('GET', url, true);
  //  xhr.setRequestHeader('accept-encoding','gzip');
  //  xhr.setRequestHeader('content-encoding','gzip');
    //xhr.setRequestHeader('accept-encoding','gzip');
    //xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();
  });
}


//var content = document.querySelector('.content');

  //var container = content.querySelector('.js-discussion');
  var container = document.getElementById('links');

  var buf = '';
  var i = 0;

  var count = 0;

  streamJSON('data/links.json', function(comment) {
    //var div = document.createElement('div');
    //div.className = comment.class;
    //div.innerHTML = comment.html;
    //container.appendChild(div); // html = $.parseHTML( str )
    //container.appendChild(comment);
    //comment.appendTo(container);
    buf += comment;
    if (i % 25000 === 0){
    container.insertAdjacentHTML('beforeend', buf);
    buf = '';
    }
    i++;
  });
  //  container.insertAdjacentHTML('beforeend', buf);
