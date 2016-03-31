import request from './request';
import insertAfter from './insert-after';

export default class {
  constructor() {
    this.form = document.getElementsByTagName('form')[0];
    this.input = document.getElementsByName('search-query')[0];
    this.header = document.getElementsByTagName('header')[0];

    this.form.addEventListener('submit', this.searchQuery.bind(this));
  }

  clearContent() {
    this.clearElementsWithClass('message');
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
    insertAfter(this.header, error_message);
  }

  searchQuery(event) {
    event.preventDefault();

    if (!!this.input.value) {
      if(this.input.value === this.current_query) {
        return;
      } else {
        this.current_query = this.input.value;
      }

      request(this.current_query).then(this.updateQueryData.bind(this));
    } else {
      this.displayErrorMessage('Please enter at least one character to search.');
    }
  }

  updateQueryData(data, current_page) {
    if(typeof(data) === 'string') {
      data = JSON.parse(data);
    }

    this.total_available = data._total;
    this.current_page = current_page || 1;

    this.clearContent();
    this.updateResultInformation();
    this.updateResults();
  }

  totalPages() {
    return Math.floor(this.total_available / 10);
  }

  isFirstPage() {
    return this.current_page === 1;
  }

  isLastPage() {
    return this.current_page === this.totalPages();
  }

  arrowString(direction) {
    console.log('theeennn....');
    return `<button><img src="img/arrow.svg" alt="${direction}" /></button>`;
  }

  leftArrow() {
    return this.isFirstPage() ? '' : this.arrowString('left');
  }

  rightArrow() {
    return this.isLastPage() ? '' : this.arrowString('right');
  }

  updateResultInformation() {
    let result_information = document.createElement('div');
    result_information.classList.add('result-information');

    let totals = `<p class="totals">Total results: ${this.total_available}</p>`;

    let pagination = `<nav>${this.leftArrow()}<span class="current-page">${this.current_page}/${this.totalPages()}</span>${this.rightArrow()}</nav>`;

    console.log(pagination, 'making it?');

    result_information.innerHTML = `${totals}${pagination}`;

    insertAfter(this.header, result_information);
  }

  updateResults() {
    console.log('I should be showing results.');
  }
}
