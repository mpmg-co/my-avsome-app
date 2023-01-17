let now = new Date();
let currentDate = document.querySelector("#current-date");

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

currentDate.innerHTML = `${day} ${month} ${date}, ${hour}:${minute}`;

function searchResult(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let location = document.querySelector("#location-entered");
  if (searchInput.value) {
    location.innerHTML = `${searchInput.value}`;
  } else {
    location.innerHTML = null;
  }
}

let locationEntered = document.querySelector("#search-form");
locationEntered.addEventListener("submit", clickSubmit);

function clickSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");

  searchCity(city.value);
}

function searchCity(city) {
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response);
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("span#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let cityElement = document.querySelector("#location-entered");
  cityElement.innerHTML = `${city}`;
}

function displayCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("span#temperature");
  h1.innerHTML = `${temperature}`;
  let h2Name = document.querySelector("#location-entered");
  h2Name.innerHTML = `${city}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "aa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#btn-secondary");
currentButton.addEventListener("click", getCurrentPosition);
