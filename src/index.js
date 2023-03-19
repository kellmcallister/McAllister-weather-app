/* The following is for the time stamp in h3 */
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

/* The following is for the city search input */
function searchCity(event) {
  event.preventDefault();
  let apiKey = "b3967db1b6cb07823c5b7912b9ec0e6c";
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
function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp-number");
  temperatureElement.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let windElement = document.querySelector("#wind-prop");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  let humidityElement = document.querySelector("#humidity-prop");
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)} %`;
  let visibilityElement = document.querySelector("#visibility-prop");
  visibilityElement.innerHTML = response.data.weather[0].main;
}
let citySearchInput = document.querySelector("#search-form");
citySearchInput.addEventListener("submit", searchCity);

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
}
let currentCityInput = document.querySelector("#current-button");
currentCityInput.addEventListener("click", runNavigator);
