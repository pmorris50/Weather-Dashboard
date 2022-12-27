
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
var icon = document.querySelector('.icon');
var futureIcon = document.querySelectorAll('.futureIcon')
var today = dayjs()
var citiesSaved = [];
var searchHistoryList = document.querySelector('.search-history')
var buttonParent = document.querySelector('.button-parent');
var removeHide = document.querySelectorAll('.hide');
var iconDisplay = document.querySelector('.icon');

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault();
    getWeather(citySearch.value)
    citiesSaved.push(citySearch.value);
    localStorage.setItem('city', JSON.stringify(citiesSaved));

});

buttonParent.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches('button')) {
        console.log(event.target.textContent)
        getWeather(event.target.textContent)
    }
})



function getWeather(cityName) {
    fiveDay(cityName);
    currentWeather(cityName);
    for (var i = 0; i < removeHide.length; i++) {
        removeHide[i].classList.remove('hide');
    }
}

function fiveDay(cityName) {
    var units = 'imperial';
    var lang = 'en';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`)
        .then(function (response) {
            return response.json()
        }).then(function (fiveDayForecast) {
            //rendering current weather to HTML
            console.log(fiveDayForecast);



            for (i = 0; i < futureForecast.length; i++) {
                futureForecast[i].classList.remove('hide');
                var icon = fiveDayForecast.list[i * 8].weather[0].icon
                console.log(icon);
                var iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
                futureIcon[i].setAttribute('src', iconURL)
                futureTemp[i].textContent = fiveDayForecast.list[i * 8].main.temp + " °F";
                futureHumidity[i].textContent = fiveDayForecast.list[i * 8].main.humidity + ' %';
                futureWind[i].textContent = fiveDayForecast.list[i * 8].wind.speed + ' MPH';
            }
            for (d = 0; d < 6; d++) {
                var correctDate = today.add(d, 'day')
                var formattedDate = correctDate.format('MMM, DD')
                futureDate[d].textContent = formattedDate;
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
            weatherReport.textContent = today.format('dddd, MMM D');
            currentTemp.textContent = 'Temp: ' + weather.main.temp + ' °F'
            currentWind.textContent = "Wind: " + weather.wind.speed + ' MPH';
            currentHumidity.textContent = 'Humiditiy: ' + weather.main.humidity + ' %';
            var icon = weather.weather[0].icon
            console.log(icon);
            var imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
            iconDisplay.setAttribute("src", imageURL);




        })

}

function renderLocalOnLoad() {
    cityArray = JSON.parse(localStorage.getItem('city')) || [];


    if (cityArray != null) {
        for (i = 0; i < cityArray.length; i++) {
            var previousButtons = document.createElement('button');
            previousButtons.classList.add('btn');
            previousButtons.textContent = cityArray[i].toUpperCase();
            buttonParent.appendChild(previousButtons);
        }
    }
}
renderLocalOnLoad();




