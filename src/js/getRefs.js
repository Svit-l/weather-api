export const getRefs = () => {
  return {
    temperDegree: document.querySelector('.temperature-degree'),
    locationTimezone: document.querySelector('.location-timezone'),
    temperatureDescription: document.querySelector('.temperature-description'),
    icon: document.querySelector('.icon'),
    skycon: document.querySelector('#icon1'),
    body: document.querySelector('body'),
    searchForm: document.querySelector('.search-form'),
    day: document.querySelector('.date__day'),
    weekDay: document.querySelector('.day__week'),
    month: document.querySelector('.date__month'),
    time: document.querySelector('.date__time'),

  };
};
