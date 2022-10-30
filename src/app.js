function formatDate(timestamp) {
   let date = new Date(timestamp);
   let hours = date.getHours();
   if (hours < 10) {
      hours = `0${hours}`;
   }
   let minutes = date.getMinutes();
   if (minutes < 10) {
      minutes = `0${minutes}`;
   }
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
   let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`;
}

function displayTemperature(responce) {
   console.log(responce.data);
   let cityElement = document.querySelector("#city");
   let temperatureElement = document.querySelector("#temperature");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");
   let dateElement = document.querySelector("#date");
   let iconElement = document.querySelector("#icon");

   celsiusTemperature = responce.data.main.temp;

   cityElement.innerHTML = responce.data.name;
   temperatureElement.innerHTML = Math.round(celsiusTemperature); // = Math.round(responce.data.main.temp.)
   descriptionElement.innerHTML = responce.data.weather[0].description;
   humidityElement.innerHTML = responce.data.main.humidity;
   windElement.innerHTML = Math.round(responce.data.wind.speed);
   dateElement.innerHTML = formatDate(responce.data.dt * 1000);
   iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", responce.data.weather[0].description);
}

function search(city) {
   let apiKey = "e91d8831d4722ffce7b07417a253b9dc";
   //   let city = "Paris";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e91d8831d4722ffce7b07417a253b9dc&units=metric `;
   axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
   event.preventDefault();
   let cityInputElement = document.querySelector("#city-input");
   search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temperature");
   celsiusLink.classList.remove("active");
   fahrenheitLink.classList.add("active");
   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temperature");
   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove("active");
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#form-serch");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
