let now = new Date();
let h4 = document.querySelector("h4");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let day = days[now.getDay()];

h4.innerHTML = `${day}, ${hour}:${minute}`;

function handleClick(event) {
  event.preventDefault();
  let h2 = document.querySelector("h2");
  let cityInput = document.querySelector("#user-input");
  h2.innerHTML = ` ${cityInput.value}`;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "ff34823356eb24de65ff432da1bc6a20";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let specialButton = document.querySelector("#city-search");
specialButton.addEventListener("submit", handleClick);

function displayForecast() {
  let forecastElement = document.querySelector("#weatherforecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperature">
          <span class="temperature-high"> 18° </span>
          <span class="temperature-low"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}


function showTemperature(response) {
  let iconElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let countryElement = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = `Currently ${temperature}°C`;
  celsiusTemperature = response.data.main.temp;

  countryElement.innerHTML = `${response.data.name}`;
  iconElement.innerHTML = `<center><img src = https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png width="10%" class="image"></center>`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h3");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `Currently ${Math.round(
    fahrenheitTemperature
  )}°F`;
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = `Currently ${Math.round(
    celsiusTemperature
  )}°C`;
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#unit-celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#unit-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ff34823356eb24de65ff432da1bc6a20";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);
