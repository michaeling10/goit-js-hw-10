'use-strict';

import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_lHLgk6t6JnyQ3R7xuYiZvdDYzu9CrDDdj53eJkAs5ltLOKrE8lsxfNFlcSAubK8z';

const loader = document.querySelector('.loader');

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
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page.',
    {
      position: 'center-top',
      closeButton: true,
    }
  );
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
