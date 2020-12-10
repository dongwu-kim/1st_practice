const weather = document.querySelector(".js-weather");

const API_KEY = `95a07adbf05b67db2bbe79aafb17f8a2`;
const COORDS = `coords`;

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      const feels_temper = json.main.feels_like;
      const weather_main = json.weather[0].description;
      weather.innerHTML = `${temperature}˚C, 체감온도 : ${feels_temper}˚C, ${weather_main}, ${place}`;
    });

  console.log(
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
  );
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access your location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  //test console.log(loadedCoords);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    //test console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
