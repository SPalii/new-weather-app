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
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   let day = days[date.getDay()];
   return `${day} ${hours}:${minutes}`;
}
//
function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   return days[day];
}

function displayForecast(responce) {   // call this fun. to show daily temp
   let forecast = responce.data.daily;
   let forecastElement = document.querySelector("#forecast");
   let forecastHTML = `<div class="row">`;
   //let days = ["Thu", "Fri", "Sat", "Sun"];
   forecast.forEach(function (forecastDay, index) {   // index- current item in array
      if (index < 6) { // show 6 days
         forecastHTML =
            forecastHTML +
            `  
      <div class="col-2">
         <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
         </div>
                      <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42px" />
               <div class="weather-forecast-temperature">
                     <span class="weather-forecast-temperature-max">
                     ${Math.round(forecastDay.temp.max)}°</span>
                     <span class="weather-forecast-temperature-min">
                     ${Math.round(forecastDay.temp.min)}°</span>
               </div>       
      </div>  
`;
      } //close (index < 6)
   });

   forecastHTML = forecastHTML + `</ div>`;
   forecastElement.innerHTML = forecastHTML;
   console.log(forecastHTML)
}

//
function getForecast(coordinates) {
   console.log(coordinates);
   let apiKey = "597c40c39084687093b091cd48b366f8";
   // let apiKey = "29a9dfa86a36d30a75ecd31d41dcc75f";
   //let apiKey = "e91d8831d4722ffce7b07417a253b9dc";

   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

   axios.get(apiUrl).then(displayForecast); // daily temp 
}
//
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
   iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`);
   iconElement.setAttribute("alt", responce.data.weather[0].description);

   getForecast(responce.data.coord);
}

function search(city) {

   let apiKey = "597c40c39084687093b091cd48b366f8";

   //let apiKey = "e91d8831d4722ffce7b07417a253b9dc";
   //let apiKey = "29a9dfa86a36d30a75ecd31d41dcc75f";
   //   let city = "Paris";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
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

