import { getRefs } from './getRefs';
import { Skycons } from './skycons';

const refs = getRefs();

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
      setSkycon(weather[0].description);
    });
}

// `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
const updateIcons = {
  'clear sky': 'CLEAR_DAY',
  'few clouds': 'PARTLY_CLOUDY_DAY',
}

function setSkycon(icon) {
  const skyconDescription = updateIcons[icon]
  const skycons = new Skycons({ color: 'lightblue' });
  skycons.set(refs.skycon, Skycons[skyconDescription]);
  skycons.play();
}

// clear-day,clear-night,partly-cloudy-day,partly-cloudy-night,cloudy,rain,sleet,snow,wind,fog
//'clear sky', 'few clouds','scattered clouds',"broken clouds","shower rain",'rain','thunderstorm','snow','mist'
