// document.addEventListener("DOMContentLoaded", () => {
const apiKey = "f715b0fd97c94b9f94e42fa2fcf65b4e";
const searchBtn = document.getElementById("searchBtn");
let cityName = document.getElementById("cityName");
let temperature = document.getElementById("temp");
let weatherDesc = document.getElementById("weatherDesc");
let descip = document.getElementById("des");
let humidity = document.getElementById("humidity");
let feelsLike = document.getElementById("feels-like");
let wind = document.getElementById("wind");
let pressure = document.getElementById("pressure");
let clouds = document.getElementById("clouds");
let bodyElement = document.getElementById("weather-info-div");
let datep = document.getElementById("date");
let timep = document.getElementById("time");
let image = document.getElementById("sym-img");
searchBtn.addEventListener("click", () => {
  const cityInput = document.getElementById("city").value;
  console.log(cityInput);
  fetchWeatherData(cityInput);
});

async function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    //   error
    if (response.status === 404) {
      document.querySelector(".error").innerHTML =
        "Error! Please enter valid city name";
      document.querySelector(".error").style.display = "block";
    } else {
      const data = await response.json();
      console.log(data);
      const date = convertUnixTimestamp(data.dt);
      temperature.textContent = `${data.main.temp.toFixed(1)}°C`;
      console.log("temp: ", data.main.temp);
      // document.getElementById("dropdown").style.display = "block";
      datep.textContent = date.date;
      timep.textContent = date.time;
      cityName.textContent = data.name;
      cityName.style.display = "block";
      humidity.textContent = `${data.main.humidity}%`;
      weatherDesc.textContent = `${data.weather[0].description}`;
      descip.textContent = `${data.weather[0].main}`;
      feelsLike.textContent = `Feels Like - ${data.main.feels_like.toFixed(
        1
      )}°C`;
      feelsLike.style.display = "block";
      wind.textContent = `${data.wind.speed} meter/sec`;
      pressure.textContent = `${data.main.pressure} hpa`;
      clouds.textContent = `${data.clouds.all} %`;

      if (data.weather[0].main == "Clouds" || data.weather[0].main == "Haze") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),url("https://images.unsplash.com/photo-1529832393073-e362750f78b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center / cover no-repeat`;
        image.src = "../images/cloudy1.png";
      }
      if (data.weather[0].main == "Clear") {
        bodyElement.style.background = `url("https://images.unsplash.com/photo-1616249807402-9dae436108cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center / cover no-repeat`;
        image.src = "../images/sunny1.png";
      }
      if (data.weather[0].main == "Rain") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80") center / cover no-repeat`;
        image.src = "../images/weather.png";
      }
      if (data.weather[0].main == "Mist" || data.weather[0].main == "Fog") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center / cover no-repeat`;
        image.src = "../images/mist1.png";
      }
      if (data.weather[0].main == "Snow") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url("https://images.unsplash.com/photo-1488818138649-d2734488e6d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80") center / cover no-repeat`;
        image.src = "../images/snowy1.png";
      }
      if (data.weather[0].main == "Drizzle") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url("https://cdn.pixabay.com/photo/2017/03/02/02/39/rocio-2110268_1280.jpg")center / cover no-repeat`;
        image.src = "../images/hail.png";
      }
    }
  } catch (error) {
    document.querySelector(".error").innerHTML =
      "Error fetching weather data,Please enter valid name";
    document.querySelector(".error").style.display = "block";

    console.error("Error fetching weather data:", error);
  }
}
// });

function celsiusToFahrenheit(celsius) {
  const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);
  return fahrenheit;
}

function fahrenheitToCelsius(fahrenheit) {
  const celsius = (((fahrenheit - 32) * 5) / 9).toFixed(2);
  return celsius;
}

function convertCelsiusToFahrenheit() {
  const temperature = parseFloat(document.getElementById("temp").textContent);

  if (document.getElementById("unit").textContent !== "°F") {
    const result = `${celsiusToFahrenheit(temperature)}`;
    document.getElementById("temp").textContent = result;
    document.getElementById("unit").textContent = "°F";
  }
  return;
}

function convertFahrenheitToCelsius() {
  const temperature = parseFloat(document.getElementById("temp").textContent);

  if (document.getElementById("unit").textContent !== "°C") {
    const result = `${fahrenheitToCelsius(temperature)}`;
    document.getElementById("temp").textContent = result;
    document.getElementById("unit").textContent = "°C";
  }
}
function convertUnixTimestamp(timestamp) {
  // Convert to milliseconds
  const date = new Date(timestamp * 1000);

  // Format the date
  const dateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC", // Change to your preferred timezone if needed
  };
  const formattedDate = date.toLocaleDateString("en-US", dateOptions);

  // Format the time
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC", // Change to your preferred timezone if needed
  };
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return {date: formattedDate, time: formattedTime};
}

async function gotLocation(position) {
  console.log(position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f715b0fd97c94b9f94e42fa2fcf65b4e`;

  try {
    const response = await fetch(apiUrl);
    //   error
    if (response.status === 404) {
      document.querySelector(".error").innerHTML =
        "Error! Please enter valid city name";
      document.querySelector(".error").style.display = "block";
    } else {
      const data = await response.json();
      console.log("data: ", data);
      const date = convertUnixTimestamp(data.dt);
      temperature.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
      descip.textContent = data.weather[0].main;
      datep.textContent = date.date;
      timep.textContent = date.time;
      cityName.textContent = data.name;
      cityName.style.display = "block";
      humidity.textContent = `${data.main.humidity}%`;
      weatherDesc.textContent = `${data.weather[0].description}`;
      feelsLike.textContent = `Feels Like - ${(
        data.main.feels_like - 273.15
      ).toFixed(1)}°C`;
      feelsLike.style.display = "block";
      wind.textContent = `${data.wind.speed} meter/sec`;
      pressure.textContent = `${data.main.pressure} hpa`;
      clouds.textContent = `${data.clouds.all} %`;

      if (data.weather[0].main == "Clouds" || data.weather[0].main == "Haze") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),url("https://images.unsplash.com/photo-1529832393073-e362750f78b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center / cover no-repeat`;
        image.src = "../images/cloudy1.png";
      }
      if (data.weather[0].main == "Clear") {
        bodyElement.style.background = `url("https://images.unsplash.com/photo-1616249807402-9dae436108cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center / cover no-repeat`;
        image.src = "../images/sunny1.png";
      }
      if (data.weather[0].main == "Rain") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),url("https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80") center / cover no-repeat`;
        image.src = "../images/weather.png";
      }
      if (data.weather[0].main == "Mist" || data.weather[0].main == "Fog") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") center / cover no-repeat`;
        image.src = "../images/mist1.png";
      }
      if (data.weather[0].main == "Snow") {
        bodyElement.style.background = `url("https://images.unsplash.com/photo-1488818138649-d2734488e6d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80") center / cover no-repeat`;
        image.src = "../images/snowy1.png";
      }
      if (data.weather[0].main == "Drizzle") {
        bodyElement.style.background = `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url("https://cdn.pixabay.com/photo/2017/03/02/02/39/rocio-2110268_1280.jpg")center / cover no-repeat`;
        image.src = "../images/hail.png";
      }
    }
  } catch (error) {
    document.querySelector(".error").innerHTML =
      "Error fetching weather data,Please enter valid name";
    document.querySelector(".error").style.display = "block";

    console.error("Error fetching weather data:", error);
  }
}
function failed() {
  console.log("failed");
}

async function geoloc() {
  navigator.geolocation.getCurrentPosition(gotLocation, failed);
}
