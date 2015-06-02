    var YoutubeChannelId = 'YOUR YOUTUBE CHANNEL ID';
    var Google_API_KEY = 'YOUR GOOGLE API KEY';
    var videoId;
    
      function init() {
        gapi.client.setApiKey(Google_API_KEY);
        gapi.client.load('youtube', 'v3').then(makeRequest);
      }
      
      
      function makeRequest() {

        var request = gapi.client.youtube.search.list({
            part: 'snippet',
            channelId: YoutubeChannelId,
            maxResults: 1,
            type: 'video',
            eventType: 'live'
            
        });
        
        request.then(function(response) {
          processResult(response);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
        

      }
      
      function processResult(result){
        
        console.log(result);
        
        var json = JSON.parse(result.body);
        if(json.pageInfo.totalResults == 0){
            // DO SOMETHING
        } else {
        videoId = json.items[0].id.videoId;
        createIframe();    
        }
        
      }
      
            
      /*****************************CREATING IFRAME*********************************/
      
      function createIframe(){
      // This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
      
      // This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: videoId,
          events: {
            'onReady': onPlayerReady,
          }
        });
      }
      
            // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }
      
      
