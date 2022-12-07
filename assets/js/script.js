//
var citySearch = document.querySelector("#city");
var weatherForm = document.querySelector('#weather-form');
var diisplayCurrentWeather = document.querySelector('#current-weather');
var apiKey =  '9cd3a752dd82b1bbbc1f1d19a793dcd8';
var weatherReport = document.querySelector('.current-weather');
var cityNameCurrent = document.querySelector('.name-city-current');
var currentTemp = document.querySelector('#tempurature');
var currentWind = document.querySelector('#wind');
var currentHumidity = document.querySelector('#humidity');
today = dayjs()
//get API call to happen when form is submitted

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(citySearch.value);
   // fiveDay(citySearch.value);
    currentWeather(citySearch.value)
});

// function fiveDay(cityName){
// var units = 'imperial';
// var lang = 'en';
// console.log(cityName)
// fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`)
// .then(function(response){
    
//     //console.log(response);
//     return response.json()
// }).then(function(fiveDayForecast){
// //rendering current weather to HTML
//     console.log(fiveDayForecast);








// })

// }


function currentWeather(cityName){
var units = 'imperial';
var lang = 'en';   
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lan=${lang})`)
.then(function(response){
console.log(response);
return response.json()
}).then(function(weather){
    console.log(weather);
   cityNameCurrent.textContent = weather.name + ' ' + weather.icon; //weather icon displaying code not image
weatherReport.textContent = today.format('dddd, MMM D') //add dayjs
currentTemp.textContent = 'Temp: ' + weather.main.temp + ' °F'
currentWind.textContent = "Wind: " + weather.wind.speed + 'MPH';
currentHumidity.textContent = 'Humiditiy: ' + weather.main.humidity + ' %';
  

})
}


function displayCurrentWeather(){
}

function callCurrentWeather(){


    
}