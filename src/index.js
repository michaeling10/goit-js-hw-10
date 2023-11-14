'use-strict';

import {
  fetchBreeds,
  fetchCatByBreed,
  displayLoader,
  notDisplayLoader,
} from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catImage = document.getElementById('cat-image');
const catInfo = document.querySelector('.cat-info');
const breedName = document.getElementById('breed-name');
const description = document.getElementById('description');
const temperament = document.getElementById('temperament');

startPage();

fetchBreeds().then(breeds => {
  notDisplayLoader();
  populateBreeds(breeds);
  breedSelect.addEventListener('change', changeBreeds);
});

function populateBreeds(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
    breedSelect.style.display = 'block';
  });
}

function changeBreeds() {
  const breedIdSelected = breedSelect.value;

  if (breedIdSelected) {
    displayLoader();
    fetchCatByBreed(breedIdSelected)
      .then(catData => {
        displayInfo(catData[0]);
      })
      .catch(error => {
        console.error('Error fetching cat data:', error);
        hideCatInfo();
      })
      .finally(() => {
        notDisplayLoader();
      });
  }
}

function displayInfo(catData) {
  catImage.src = catData.url;

  breedName.textContent = catData.breeds[0].name || 'No description available';
  description.textContent =
    catData.breeds[0].description || 'No description available';
  temperament.textContent =
    catData.breeds[0].temperament || 'No information available';
  catInfo.style.display = 'flex';
}

function hideCatInfo() {
  catInfo.style.display = 'none';
}

function startPage() {
  displayLoader();
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
}
