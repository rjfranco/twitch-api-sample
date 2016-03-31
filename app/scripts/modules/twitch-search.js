import request from './request';

export default class {
  constructor() {
    this.form = document.getElementsByTagName('form')[0];
    this.input = document.getElementsByName('search-query')[0];
    this.header = document.getElementsByTagName('header')[0];

    this.form.addEventListener('submit', this.searchQuery.bind(this));
  }

  clearContent() {
    this.clearElementsWithClass('messages');
    this.clearElementsWithClass('results');
  }

  clearElementsWithClass(element_class) {
    let elements = document.getElementsByClassName(element_class);

    for (var i=0; i < elements.length; i++) {
      elements[i].remove();
    }
  }

  displayErrorMessage(message) {
    this.clearContent();
    let error_message = document.createElement('p');
    error_message.classList.add('message');
    error_message.classList.add('error');
    error_message.innerText = message;
    this.header.parentNode.insertBefore(error_message, this.header.nextSibling);
  }

  searchQuery(event) {
    event.preventDefault();

    if (!!this.input.value) {
      request(this.input.value);
    } else {
      this.displayErrorMessage('Please enter at least one character to search.');
    }
  }
}
