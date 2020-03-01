require.config({
  baseUrl: "js",
    paths: {
        "jQuery": 'jquery-3.4.1.min',
        "zlib": "zlib.min",
        "popper": 'popper',
        "modernizr": 'modernizr.min',
        "lunr": 'lunr-2.3.8',
        "material": 'material.min',
        'bootstrap': 'bootstrap.min',
        'pako': 'pako.min',
        'fetch': 'fetch',
        'app': 'script'
    },
    shim: {
      "bootstrap": ["jQuery"],
        'jQuery': {
            exports: '$'
        }

    }

});
require([]);
requirejs(['jQuery','pako'], function( $, Inflator ) {
   var bootstrap = require('jQuery');
   var comm = require('pako');
    console.log( $ ) // OK
});
requirejs(['bootstrap','popper','modernizr','lunr','material','pako','fetch','app']);

//require(['jquery-3.4.1.min', 'modernizr', 'lunr', 'material', 'bootstrap', 'pako', 'fetch', 'app']);
