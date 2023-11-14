'use-strict';

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_lHLgk6t6JnyQ3R7xuYiZvdDYzu9CrDDdj53eJkAs5ltLOKrE8lsxfNFlcSAubK8z';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      errorMessage();
      throw error;
    });
}

function errorMessage() {
  const errorMessageElement = document.querySelector('.error');
  errorMessageElement.style.display = 'block';
  notDisplayLoader();
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      errorMessage();
      throw error;
    });
}

export function displayLoader() {
  loader.style.display = 'block';
}

export function notDisplayLoader() {
  loader.style.display = 'none';
}
