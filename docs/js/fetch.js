//import ndjsonStream from "can-ndjson-stream";
import { ndjsonStream, stache, stacheConverters, StacheElement, type } from "//unpkg.com/can@6/everything.mjs";

//var zlib = require('jQuery');

function load_gzip(){
  var xmlhttp = new XMLHttpRequest();
  var url = "data/index2.json";

  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var myArr = this.responseText;
          idx = lunr.Index.load(JSON.parse(myArr));
          var i = 0;
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
load_gzip();

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
for (var i=0, strLen=str.length; i < strLen; i++) {
  bufView[i] = str.charCodeAt(i);
}
return buf;
}
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

function inflate() {

var inflator = new pako.Inflate();

  return new TransformStream({
    transform(chunk, controller) {
      //var trimmed = JSON.stringify(chunk);

      //var result = pako.inflate(new Uint8Array(chunk));
      inflator.push(new Uint8Array(chunk));

      //result = JSON.parse(result || '{}');

      //var buf = str2ab(result);


      //let data = JSON.parse(result || '{}');

      //var test = JSON.parse(chunk);
      controller.enqueue(new Uint8Array(inflator.result));
    }
  });
}

function parseJSON() {
    return new TransformStream({
        transform(chunk, controller) {
          //result = JSON.parse(result || '{}');
        //    chunk.replace(/\"/g, "");
            controller.enqueue(JSON.parse(chunk || '{}'));
        }
    });
}

function writeDom() {
  var container = document.getElementById('links');
    return new TransformStream({
        transform(chunk, controller) {
          //result = JSON.parse(result || '{}');
          //  chunk.replace(/\"/g, "");
          //  controller.enqueue(JSON.parse(chunk || '{}'));

          container.insertAdjacentHTML('beforeend', "<li>test</li>");
          controller.enqueue(JSON.parse(chunk || '{}'));
        }
    });
}

function splitStream(splitOn) {
    let buffer = '';

    return new TransformStream({
        transform(chunk, controller) {
            buffer += chunk;
            const parts = buffer.split(splitOn);
            parts.slice(0, -1).forEach(part => controller.enqueue(part));
            //buffer = parts[parts.length - 1];
            buffer = parts[parts.length - 1];
        },
        flush(controller) {
            if (buffer) controller.enqueue(buffer);
        }
    });
}

function makeJsonDecoder() {
  return new TransformStream({
    start(controller) {
      controller.buf = ''
      controller.pos = 0
    },
    transform(chunk, controller) {
      controller.buf += chunk
      while (controller.pos < controller.buf.length) {
        if (controller.buf[controller.pos] == '\n') {
          const line = controller.buf.substring(0, controller.pos)
          controller.enqueue(JSON.parse(line))
          controller.buf = controller.buf.substring(controller.pos + 1)
          controller.pos = 0
        } else {
          ++controller.pos
        }
      }
    }
  })
}

async function process() {
    // Retrieve NDJSON from the server
    const response = await fetch('data/links_trunc_ndjson4.json.gz');

    const results = response.body
        // // From bytes to text:
        .pipeThrough(inflate())

        .pipeThrough(new TextDecoderStream())


    //    .pipeThrough(splitStream('\n'))

        .pipeThrough(makeJsonDecoder())

        .pipeThrough(writeDom());

  //  writeToDOM(results.getReader());
  $.event.trigger({
  type: "loadedHtml",
  message: "Hello World!",
  time: new Date()
 });
}

function concatBuffers(buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
  tmp.set(new Uint8Array(buffer1), 0);
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
  return tmp.buffer;
};

function Uint8ToBase64(u8Arr){
  var CHUNK_SIZE = 0x8000; //arbitrary number
  var index = 0;
  var length = u8Arr.length;
  var result = '';
  var slice;
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return btoa(result);
}

function process2(){

//fetch('data/links_trunc_ndjson4.json.gz')
//  .then(response => response.body )
//    .then(rs => rs.pipeThrough(inflate()))
//    .then(rs => rs.pipeThrough(new TextDecoderStream()))
//    .then(rs => rs.pipeThrough(makeJsonDecoder()))
  //  .then(rs => rs.pipeTo(writeDom()))
//    .then(rs => writeToDOM(rs));
//}

}

function writeToDOM(rs) {

  var container = document.getElementById('links');
  var reader = rs.getReader();
    let read;
    reader.read().then( read = ( result ) => {
        if ( result.done ) {
            console.log("Done loading links");
            $.event.trigger({
                type: "loadedHtml",
                message: "Hello World!",
                time: new Date()
            });
            return;
        }
      //  var trimmed = JSON.stringify(result.value);
        var result = result.value.item;
        container.insertAdjacentHTML('beforeend', result);
        //var str2 = pako.inflate(result.value, { to: 'string' });

      //  console.log( trimmed );
        reader.read().then( read );

    } );

// );
}
   //.then(

  //    reader.read().then( read = ( result ) => {
  //        if ( result.done ) {
  //            return;
  //        }
  //        var trimmed = JSON.stringify(result.value);
          //var str2 = pako.inflate(result.value, { to: 'string' });

  //        console.log( trimmed );
  //        reader.read().then( read );

  //    } );

  //      ({ value, done }) => {
  //          if (done) {
  //              console.log("The stream was already closed!");

  //          } else {
               //value.replace(/\"/g, "");
               //value = JSON.parse(value);
  //             console.log(value.item);
                // Build up the values
                //let result = document.createElement('div');
                //result.innerHTML = `<div>ID: ${value.id} - Phone: ${value.phone} - Result: ${value.result}</div><br>`;

                // Prepend to the target
                //targetDiv.insertBefore(result, targetDiv.firstChild);

                // Recursively call
                //writeToDOM(reader);
  //          }
  //      },
  //      e => console.error("The stream became errored and cannot be read from!", e)
//    );
//}

process2();
