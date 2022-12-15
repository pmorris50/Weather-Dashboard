
var citySearch = document.querySelector("#city");
var weatherForm = document.querySelector('#weather-form');
var diisplayCurrentWeather = document.querySelector('#current-weather');
var apiKey = '9cd3a752dd82b1bbbc1f1d19a793dcd8';
var weatherReport = document.querySelector('.current-weather');
var cityNameCurrent = document.querySelector('.name-city-current');
var currentTemp = document.querySelector('#tempurature');
var currentWind = document.querySelector('#wind');
var currentHumidity = document.querySelector('#humidity');
var futureDate = document.querySelectorAll('.weather-forecast');
var futureTemp = document.querySelectorAll('.future-temp');
var futureWind = document.querySelectorAll('.future-wind');
var futureHumidity = document.querySelectorAll('.future-humidity');
var futureForecast = document.querySelectorAll('.day');
//var currentContainer = document.querySelector('.current-weather-box')
var today = dayjs()
var citiesSaved = [];
var searchHistoryList = document.querySelector('.search-history')
var buttonParent = document.querySelector('.button-parent');
//var forecastLength = document.querySelectorAll('.forecast');
var removeHide = document.querySelectorAll('.hide');

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // console.log(citySearch.value);
   
    // currentContainer.classList.remove('hide');
    // forecastLength.classList.remove('hide');
    getWeather(citySearch.value)
    citiesSaved.push(citySearch.value);
    localStorage.setItem('city', JSON.stringify(citiesSaved));
   
});

buttonParent.addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.matches('button')) {
        console.log(event.target.textContent)
        getWeather(event.target.textContent)
    }
})

function getWeather(cityName) {
    fiveDay(cityName);
    currentWeather(cityName);
    for(var i = 0; i< removeHide.length; i++){
    removeHide[i].classList.remove('hide');
    }
}

function fiveDay(cityName) {
    var units = 'imperial';
    var lang = 'en';
    //console.log(cityName)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`)
        .then(function (response) {

            //console.log(response);
            return response.json()
        }).then(function (fiveDayForecast) {
            //rendering current weather to HTML
            console.log(fiveDayForecast);
            for (i = 0; i < futureForecast.length; i++) {
                
                futureForecast[i].classList.remove('hide');

                futureDate[i].textContent = fiveDayForecast.list[i * 8].dt_txt;
                futureTemp[i].textContent = fiveDayForecast.list[i * 8].main.temp + " °F";
                futureHumidity[i].textContent = fiveDayForecast.list[i * 8].main.humidity + ' %';
                futureWind[i].textContent = fiveDayForecast.list[i * 8].wind.speed + ' MPH';
            }
         })
}


function currentWeather(cityName) {
    var units = 'imperial';
    var lang = 'en';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lan=${lang})`)
        .then(function (response) {
            console.log(response);
            return response.json()
        }).then(function (weather) {
            console.log(weather);
            
            cityNameCurrent.textContent = weather.name + ' Weather'; 
            weatherReport.textContent = today.format('dddd, MMM D') 
            currentTemp.textContent = 'Temp: ' + weather.main.temp + ' °F'
            currentWind.textContent = "Wind: " + weather.wind.speed + ' MPH';
            currentHumidity.textContent = 'Humiditiy: ' + weather.main.humidity + ' %';


        })
}

function renderLocalOnLoad() {
    cityArray = JSON.parse(localStorage.getItem('city')) || [];

   // console.log(cityArray);
    
    if(cityArray != null){ 
        for (i = 0; i < cityArray.length; i++) {
        var previousButtons = document.createElement('button');
        previousButtons.classList.add('btn');
        previousButtons.textContent = cityArray[i];
        buttonParent.appendChild(previousButtons);
         }
    }}
renderLocalOnLoad();




