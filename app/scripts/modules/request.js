export default function request(query) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    let url = 'https://api.twitch.tv/kraken/search/streams';
    let query = url + '?q='+ query;

    xhr.open('get', query);

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
