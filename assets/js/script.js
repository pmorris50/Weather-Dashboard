//
var citySearch = document.querySelector("#city");
var weatherForm = document.querySelector('#weather-form');
var diisplayCurrentWeather = document.querySelector('#current-weather');
var apiKey =  '9cd3a752dd82b1bbbc1f1d19a793dcd8';




//get API call to happen when form is submitted

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(citySearch.value);
    fiveDay(citySearch.value);
    currentWeather(citySearch.value)
});

function fiveDay(cityName){
var units = 'imperial';
var lang = 'en';
console.log(cityName)
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`).then(function(responseBody){
    console.log(responseBody);
    return responseBody.json()
}).then(function(fiveDayForecast){
    console.log(fiveDayForecast);

})

}


function currentWeather(cityName){
var units = 'imperial';
var lang = 'en';   
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lan=${lang})`).then(function(responseBody){
console.log(responseBody);
return responseBody.json()
}).then(function(weather){
    console.log(weather);
  

})
}


// function displayCurrentWeather(){



// }