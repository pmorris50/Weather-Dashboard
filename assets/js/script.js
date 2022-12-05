//
var citySearch = document.querySelector("#city");
var weatherForm = document.querySelector('#weather-form');

var apiKey =  '9cd3a752dd82b1bbbc1f1d19a793dcd8';



//get API call to happen when form is submitted

weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(citySearch.value);
    fiveDay(citySearch.value);
});

function fiveDay(cityName){

console.log(cityName)
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`).then(function(responseBody){
    console.log(responseBody);
    return responseBody.json()
}).then(function(fiveDayForecast){
    console.log(fiveDayForecast);

})
}