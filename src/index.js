function searchCity(event) {
  event.preventDefault();
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let units = "imperial";
  let searchInput = document.querySelector("#city-input");
  let apiCity = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&units=${units}&appid=${apiKey}`;

  let h2 = document.querySelector("h2");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value}`;
  } else {
    h2.innerHTML = `Please search a city`;
  }
  axios.get(apiUrl).then(showTemperature);
}

function formatOpenWeatherDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let dayArray = response.data.daily;
  let forecastElement = document.querySelector("#forecast-form");
  let forecastHTML = `<div class="row">`;

  dayArray.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
  <img class="forecast-icon" src="https://openweathermap.org/img/wn/${
    day.weather[0].icon
  }@2x.png"/>
  <div class="weekday-text">${formatOpenWeatherDay(day.dt)}</div>
  <span class="forecast-temp-low">${Math.round(
    day.temp.min
  )}°</span> - <span class="forecast-temp-high"> ${Math.round(
          day.temp.max
        )}°</span>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp-number");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let windElement = document.querySelector("#wind-prop");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  let humidityElement = document.querySelector("#humidity-prop");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)} %`;
  let visibilityElement = document.querySelector("#visibility-prop");
  visibilityElement.innerHTML = response.data.weather[0].main;
  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemp = response.data.main.temp;
  windImperial = response.data.wind.speed;
  getForecast(response.data.coord);
}
function runNavigator(event) {
  navigator.geolocation.getCurrentPosition(showCurrent);
}
function showCurrent(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b3967db1b6cb07823c5b7912b9ec0e6c";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateCurrentCity);
}
function updateCurrentCity(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#current-temp-number");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let windElement = document.querySelector("#wind-prop");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  let humidityElement = document.querySelector("#humidity-prop");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)} %`;
  let visibilityElement = document.querySelector("#visibility-prop");
  visibilityElement.innerHTML = response.data.weather[0].main;
  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
  fahrenheitTemp = response.data.main.temp;
  windImperial = response.data.wind.speed;
  getForecast(response.data.coord);
}
function convertCelcius(event) {
  event.preventDefault();
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#current-temp-number");
  temperatureElement.innerHTML = Math.round(celciusTemp) + "°";
  let windElement = document.querySelector("#wind-prop");
  windElement.innerHTML = Math.round(windImperial * 1.609) + " km/h";
}
function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp-number");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp) + "°";
  let windElement = document.querySelector("#wind-prop");
  windElement.innerHTML = Math.round(windImperial) + " mph";
}

let now = new Date();
let h3 = document.querySelector("h3");

let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let currentDay = days[now.getDay()];
h3.innerHTML = `Today is ${currentDay}, ${currentHour}:${currentMinute}`;

let citySearchInput = document.querySelector("#search-form");
citySearchInput.addEventListener("submit", searchCity);

let currentCityInput = document.querySelector("#current-button");
currentCityInput.addEventListener("click", runNavigator);

let fahrenheitTemp = null;
let windImperial = null;

let convertToC = document.querySelector("#temp-c");
convertToC.addEventListener("click", convertCelcius);

let convertToF = document.querySelector("#temp-f");
convertToF.addEventListener("click", convertFahrenheit);
