import { getRefs } from './getRefs';

const refs = getRefs();
console.log(refs.temperDegree);

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    //   console.log(position);
    const long = position.coords.longitude;
    const lat = position.coords.latitude;
    getWeather(long, lat);
  });
}

// `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5c8dab899c73e9fec8517804e94f0209&units=metric&lang=en`;

function getWeather(long, lat) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5c8dab899c73e9fec8517804e94f0209&units=metric&lang=en`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(({ main, weather, name }) => {
      //   console.log(data);
      refs.temperDegree.textContent = Math.round(main.temp);
      refs.locationTimezone.textContent = name;
      refs.temperatureDescription.textContent = weather[0].main;
      refs.icon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      console.log(weather);
      console.log(weather[0].main);
      console.log(weather[0].id);
    });
}

// `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
