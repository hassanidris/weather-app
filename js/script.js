const apiKey = "46f80a02ecae410460d59960ded6e1c6";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
    console.log(cityValue)
  });
  
  async function getWeatherData(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  

      const temperature = Math.round(data.main.temp)
      const desc = data.weather[0].description
      const icon = data.weather[0].icon

      const details = [
        `Feels like: ${Math.round(data.main.feels_like)}°C`, 
        `Humidity: ${data.main.humidity}%`, 
        `Wind speed: ${data.wind.speed}m/s`, 
      ]

      weatherDataEl.querySelector(".weather_icon").innerHTML = `<img
      src="http://openweathermap.org/img/wn/${icon}.png"
      alt="Weather Icon"
    />`;

    weatherDataEl.querySelector(".weather_temperature").textContent = `${temperature}°C`;

    weatherDataEl.querySelector(".weather_desc").textContent = `${desc}`;

    weatherDataEl.querySelector(".weather_details").innerHTML = details.map((detail)=>`<div>${detail}</div>`).join("");
    } catch (error) {

        weatherDataEl.querySelector(".weather_icon").innerHTML = "";

    weatherDataEl.querySelector(".weather_temperature").textContent = "";

    weatherDataEl.querySelector(".weather_desc").textContent = "An error happened, please try write the right city name";

    weatherDataEl.querySelector(".weather_details").innerHTML = "";
    }
}