/**
 * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
 * headers according to the format described here:
 * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
 * This method parses that string into a user-friendly key/value pair object.
 */
function parseResponseHeaders(headerStr) {
  var headers = {};
  if (!headerStr) {
    return headers;
  }
  var headerPairs = headerStr.split('\u000d\u000a');
  for (var i = 0, len = headerPairs.length; i < len; i++) {
    var headerPair = headerPairs[i];
    var index = headerPair.indexOf('\u003a\u0020');
    if (index > 0) {
      var key = headerPair.substring(0, index);
      var val = headerPair.substring(index + 2);
      headers[key] = val;
    }
  }
  return headers;
}

/**
 * Read the value of a header in the current document.
 *
 * This uses a [single] XMLHTTPRequest to do a HEAD of the current document 
 * and fetch HTTP response header values. Note that the implementation is 
 * rather stupid in that it spins waiting for the XMLHTTPRequest to complete
 * if it hasn't been called yet.
 *
 * @param name string
 *     The name of the header.
 * @return string
 *     The value (or undefined).
 */
var readHeader = (function() {

  // Hidden cache for the headers...
  var _request = undefined;

  return function(name) {
    //
    // We have a request cached...
    ///
    if (_request) {
      return _request.getResponseHeader(name);
    }

    //
    // We need to get the request...
    //
    else {
      // Do the request and wait for it to complete.
      _request = new XMLHttpRequest();
      _request.open("HEAD", window.location, true);
      _request.send(null)
      while (_request.readyState != 4) {};
      
      return _request.getResponseHeader(name);
    }
  }
})();
