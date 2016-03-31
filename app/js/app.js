(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _request = require('./modules/request');

var _request2 = _interopRequireDefault(_request);

var _twitchSearch = require('./modules/twitch-search');

var _twitchSearch2 = _interopRequireDefault(_twitchSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.twitch_search = new _twitchSearch2.default();

},{"./modules/request":3,"./modules/twitch-search":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, element_to_insert) {
  element.parentNode.insertBefore(element_to_insert, element.nextSibling);
};

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('./request');

var _request2 = _interopRequireDefault(_request);

var _insertAfter = require('./insert-after');

var _insertAfter2 = _interopRequireDefault(_insertAfter);

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
      this.clearElementsWithClass('message');
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
      (0, _insertAfter2.default)(this.header, error_message);
    }
  }, {
    key: 'searchQuery',
    value: function searchQuery(event) {
      event.preventDefault();

      if (!!this.input.value) {
        if (this.input.value === this.current_query) {
          return;
        } else {
          this.current_query = this.input.value;
        }

        (0, _request2.default)(this.current_query).then(this.updateQueryData.bind(this));
      } else {
        this.displayErrorMessage('Please enter at least one character to search.');
      }
    }
  }, {
    key: 'updateQueryData',
    value: function updateQueryData(data, current_page) {
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      this.total_available = data._total;
      this.current_page = current_page || 1;

      this.clearContent();
      this.updateResultInformation();
      this.updateResults();
    }
  }, {
    key: 'totalPages',
    value: function totalPages() {
      return Math.floor(this.total_available / 10);
    }
  }, {
    key: 'isFirstPage',
    value: function isFirstPage() {
      return this.current_page === 1;
    }
  }, {
    key: 'isLastPage',
    value: function isLastPage() {
      return this.current_page === this.totalPages();
    }
  }, {
    key: 'arrowString',
    value: function arrowString(direction) {
      console.log('theeennn....');
      return '<button><img src="img/arrow.svg" alt="' + direction + '" /></button>';
    }
  }, {
    key: 'leftArrow',
    value: function leftArrow() {
      return this.isFirstPage() ? '' : this.arrowString('left');
    }
  }, {
    key: 'rightArrow',
    value: function rightArrow() {
      return this.isLastPage() ? '' : this.arrowString('right');
    }
  }, {
    key: 'updateResultInformation',
    value: function updateResultInformation() {
      var result_information = document.createElement('div');
      result_information.classList.add('result-information');

      var totals = '<p class="totals">Total results: ' + this.total_available + '</p>';

      var pagination = '<nav>' + this.leftArrow() + '<span class="current-page">' + this.current_page + '/' + this.totalPages() + '</span>' + this.rightArrow() + '</nav>';

      console.log(pagination, 'making it?');

      result_information.innerHTML = '' + totals + pagination;

      (0, _insertAfter2.default)(this.header, result_information);
    }
  }, {
    key: 'updateResults',
    value: function updateResults() {
      console.log('I should be showing results.');
    }
  }]);

  return _class;
}();

exports.default = _class;

},{"./insert-after":2,"./request":3}]},{},[1]);
