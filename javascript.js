//function myFunction() {
//document.getElementById("temp").innerHTML = "66";
//}

//function myFunctionA() {
//document.getElementById("temp").innerHTML = "19";
//}
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

//function tempUnit(event) {
//event.preventDefault();
//let changeTemp = document.querySelector("#unit-celsius");
//changeTemp.addEventListener("click", tempUnit);
//temp.innerHTML = `66`;
//}

let weather = {
  paris: {
    temperature: "19.4",
    humidity: "80%",
  },

  sydney: {
    temperature: "16.3",
    humidity: "45%",
  },

  singapore: {
    temperature: "32.3",
    humidity: "88%",
  },

  seoul: {
    temperature: "21.5",
    humidity: "39%",
  },

  japan: {
    temperature: "17.9",
    humidity: "81%",
  },

  bangkok: {
    temperature: "28.9",
    humidity: "81%",
  },
};

let apiKey = "ff34823356eb24de65ff432da1bc6a20";
let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff34823356eb24de65ff432da1bc6a20&&units=metric";
//let cityInput = document.querySelector("#city-search");
//let city = cityInput;

//function displayTemperature(response) {
//let temperature = Math.round(response.data.main.temp);
//let temperatureElement = document.querySelector("h3");
//temperatureElement.innerHTML = `It is currently ${temperature} degrees in ${response.data.name}`;
//}
//let specialButton = document.querySelector("#user-input");
//specialButton.addEventListener("submit", displayTemperature);

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
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h3");
  temperatureElement.innerHTML = `${temperature} degrees in ${response.data.name}`;
}
let specialButton = document.querySelector("#city-search");
specialButton.addEventListener("submit", handleClick);

axios.get(`${apiUrl}&appID=${apiKey}`).then(displayTemperature);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let temperatureElement = document.querySelector("h3");
  let countryElement = document.querySelector("h2");

  countryElement.innerHTML = `${response.data.name}`;
  iconElement.innerHTML = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#units");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#units");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#unit-celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#unit-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);
