(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _request = require('./modules/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// request('https://api.twitch.tv/kraken/search/streams?q=starcraft', 'get').then(function(data) {
//   console.log(data);
// });

var form = document.getElementsByTagName('form')[0];
var input = document.getElementsByName('search-query')[0];
var header = document.getElementsByTagName('header')[0];

function clearContent() {
  var messages = document.getElementsByClassName('message');

  for (var i = 0; i < messages.length; i++) {
    messages[i].remove();
  }
}

function displayErrorMessage(message) {
  clearContent();
  var error_message = document.createElement('p');
  error_message.classList.add('message');
  error_message.classList.add('error');
  error_message.innerText = message;
  header.parentNode.insertBefore(error_message, header.nextSibling);
}

function searchQuery(event) {
  event.preventDefault();

  if (!!input.value) {
    (0, _request2.default)(input.value);
  } else {
    displayErrorMessage('Please enter at least one character to search.');
  }
}

form.addEventListener('submit', searchQuery);

},{"./modules/request":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = request;
function request(query) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.twitch.tv/kraken/search/streams';
    var query = url + '?q=' + query;

    xhr.open('get', query);

    xhr.onload = function () {
      if (this.status == 200) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send();
  });
}

},{}]},{},[1]);
