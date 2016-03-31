import request from './modules/request';

// request('https://api.twitch.tv/kraken/search/streams?q=starcraft', 'get').then(function(data) {
//   console.log(data);
// });

var form = document.getElementsByTagName('form')[0];
var input = document.getElementsByName('search-query')[0];
var header = document.getElementsByTagName('header')[0];

function clearContent() {
  let messages = document.getElementsByClassName('message');

  for (var i=0; i < messages.length; i++) {
    messages[i].remove();
  }
}

function displayErrorMessage(message) {
  clearContent();
  let error_message = document.createElement('p');
  error_message.classList.add('message');
  error_message.classList.add('error');
  error_message.innerText = message;
  header.parentNode.insertBefore(error_message, header.nextSibling);
}

function searchQuery(event) {
  event.preventDefault();

  if (!!input.value) {
    request(input.value);
  } else {
    displayErrorMessage('Please enter at least one character to search.');
  }
}

form.addEventListener('submit', searchQuery);
