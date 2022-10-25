function displayTemperature(responce) {
   //console.log(responce.data.main.name);
   let cityElement = document.querySelector("#city");
   let temperatureElement = document.querySelector("#temperature");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windElement = document.querySelector("#wind");


   cityElement.innerHTML = responce.data.name;
   temperatureElement.innerHTML = Math.round(responce.data.main.temp);
   descriptionElement.innerHTML = responce.data.weather[0].description;
   humidityElement.innerHTML = responce.data.main.humidity;
   windElement.innerHTML = Math.round(responce.data.wind.speed);


}
let apiKey = "e91d8831d4722ffce7b07417a253b9dc"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&APPID=e91d8831d4722ffce7b07417a253b9dc&units=metric `;
axios.get(apiUrl).then(displayTemperature);