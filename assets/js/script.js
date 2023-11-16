"use strict";

const weatherDataEl = document.querySelector("#weatherData");

const cityInputEl = document.querySelector("#cityInput");

const formEl = document.querySelector("#weatherForm");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityValue = cityInputEl.value;
  cityInputEl.focus();
  cityInputEl.value = "";
  getWeatherData(cityValue);
  console.log(cityValue);
});

async function getWeatherData(city) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "10636befecmshf12d9d703be1996p1e7855jsn579b30708327",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const selectedCity = data.location.name;
    const temperature = Math.round(data.current.temp_c);
    const desc = data.current.condition.text;
    const icon = data.current.condition.icon;

    const details = [
      `Feels like: ${Math.round(data.current.feelslike_c)}°C`,
      `Humidity: ${data.current.humidity}%`,
      `Wind speed: ${data.current.wind_mph}mph`,
    ];

    weatherDataEl.querySelector(
      ".weather_icon"
    ).innerHTML = `<img src="${icon}" alt="Weather Icon" />`;

    weatherDataEl.querySelector(
      "#selectedCity"
    ).textContent = `${selectedCity}`;

    weatherDataEl.querySelector(
      "#weatherTemperature"
    ).textContent = `${temperature}°C`;

    weatherDataEl.querySelector("#weatherDesc").textContent = `${desc}`;

    weatherDataEl.querySelector("#weatherDetails").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");

    console.log(data);
  } catch (error) {
    console.error(error);

    // weatherDataEl.querySelector(".weather_icon").innerHTML = "";

    // weatherDataEl.querySelector("#weatherTemperature").textContent = "";

    // weatherDataEl.querySelector("#weatherDesc").textContent = "An error happened, please try write the right city name";

    // weatherDataEl.querySelector("#weatherDetails").innerHTML = "";
  }
}

getWeatherData("London");
