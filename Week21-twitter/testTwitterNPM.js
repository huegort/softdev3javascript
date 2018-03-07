var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'c342gidaf9hXT3I7DMBB8dF1O',
    consumer_secret: '7XTH06P8DKJogEc4EEv73ONlDWGBbCayoa8IkQHWK1TTQmQvbY',
    access_token_key: '',
    access_token_secret: ''
});

/*
client.post('oauth2/token',{grant_type:'client_credentials'},function(error,tweets, responsse){
    if(error){
        console.log(error)
        console.log("yep thats an error");
    }
    else {
        console.log(tweets);
        console.log("******************");
        console.log(responsse);
    }
})
*/

var params = {screen_name:'realDonaldTrump'};
client.get('followers/list', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
            console.log("**********");
            console.log(response);
        }else{
            console.log(error);
            console.log("yep there was an error");
        }
});
