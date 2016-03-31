import request from './modules/request';

request('https://api.twitch.tv/kraken/search/streams?q=starcraft', 'get').then(function(data) {
  console.log(data);
});
