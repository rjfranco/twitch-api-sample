(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _request = require('./modules/request');

var _request2 = _interopRequireDefault(_request);

var _twitchSearch = require('./modules/twitch-search');

var _twitchSearch2 = _interopRequireDefault(_twitchSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _twitchSearch2.default();

},{"./modules/request":2,"./modules/twitch-search":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (query) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.twitch.tv/kraken/search/streams';
    var request_url = url + '?q=' + query;

    xhr.open('get', request_url);

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
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.form = document.getElementsByTagName('form')[0];
    this.input = document.getElementsByName('search-query')[0];
    this.header = document.getElementsByTagName('header')[0];

    this.form.addEventListener('submit', this.searchQuery.bind(this));
  }

  _createClass(_class, [{
    key: 'clearContent',
    value: function clearContent() {
      this.clearElementsWithClass('messages');
      this.clearElementsWithClass('results');
    }
  }, {
    key: 'clearElementsWithClass',
    value: function clearElementsWithClass(element_class) {
      var elements = document.getElementsByClassName(element_class);

      for (var i = 0; i < elements.length; i++) {
        elements[i].remove();
      }
    }
  }, {
    key: 'displayErrorMessage',
    value: function displayErrorMessage(message) {
      this.clearContent();
      var error_message = document.createElement('p');
      error_message.classList.add('message');
      error_message.classList.add('error');
      error_message.innerText = message;
      this.header.parentNode.insertBefore(error_message, this.header.nextSibling);
    }
  }, {
    key: 'searchQuery',
    value: function searchQuery(event) {
      event.preventDefault();

      if (!!this.input.value) {
        (0, _request2.default)(this.input.value);
      } else {
        this.displayErrorMessage('Please enter at least one character to search.');
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./request":2}]},{},[1]);
