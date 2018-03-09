// ---------- Movie Spoiler Assignment ----------
//console.log('testing');
//Terminal:  node spoiler.js 'stranger things' 5  to run the node

for(let i = 2; i < process.argv.length; i++){
    console.log(process.argv[i]);
}

console.log('**spoiler warning** we will be spoiling the plot of ' + process.argv[2] + ' in ' + process.argv[3] + ' seconds!');

//*** Google scraping
var request = require('request'); 
var cheerio = require('cheerio');
var movies =  process.argv[2];
var websites = "https://www.google.ca/search?&query=" + movies;

request(websites, function(error, response, body){
    if(!error){
        var $ = cheerio.load(body);
        $('h3.r a').each(function(){
            let headlines = $(this).text();
            console.log(headlines);
        });
    }else{
        console.log('Oops, there\'s an error: '+ error);
    }
});

//*** Spoiler countdown
let seconds = process.argv[3] * 1000;
setTimeout(showSpoiler, seconds);

//*** Web API / JSON
const express = require('express');
const app = express();

function showSpoiler() {
    console.log('---------SPOILER!! SPOILER!!---------');
    let api = 'https://api.themoviedb.org/3/search/movie?api_key=1555dd396b0c44c8d64150a64dcb3435&query=' + movies;
    request(api, function(error,response,body){
       if(!error){
        //   console.log(body);
          let bodyObj = JSON.parse(body); //!! to convert the 'string objects' to objects in the JSON body 
        //   console.log(bodyObj);
          let resultsArr = bodyObj.results;
        //   console.log(resultsArr);
        for (var i = 0; i < resultsArr.length; i++) {
            let spoiler = bodyObj.results[i].overview; 
            console.log('Spoiler: ' + spoiler); 
         }  
       }else{
           console.log('Oops, there\'s an error: ' + error);
       }
        
    });

}

//[node spoiler.js 'Movie Names', 5]




