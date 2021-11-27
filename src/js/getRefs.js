export const getRefs = () => {
  return {
    temperDegree: document.querySelector('.temperature-degree'),
    locationTimezone: document.querySelector('.location-timezone'),
    temperatureDescription: document.querySelector('.temperature-description'),
    icon: document.querySelector('.icon'),
    skycon: document.querySelector('#icon1'),
    body: document.querySelector('body'),
    searchForm: document.querySelector('.search-form'),
  };
};
