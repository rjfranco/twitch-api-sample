export default function(query, page) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    let url = 'https://api.twitch.tv/kraken/search/streams';
    let request_url = url + '?limit=10&q='+ query;

    if(page) {
      request_url += `&offset=${(page - 1) * 10}`;
    }

    xhr.open('get', request_url);

    xhr.onload = function() {
      if (this.status == 200) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send();
  });
}
