'use-strict';

import {
  fetchBreeds,
  fetchCatByBreed,
  displayLoader,
  notDisplayLoader,
} from './cat-api';
import TomSelect from 'tom-select';

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
  const options = breeds.map(breed => ({ value: breed.id, text: breed.name }));

  const select = new TomSelect(breedSelect, {
    hideSelected: false,
    options: options,
    placeholder: 'Select a Breed...',
  });
}

function changeBreeds() {
  const selectedOption = breedSelect.options[breedSelect.selectedIndex];
  const breedIdSelected = selectedOption.value;

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
  breedName.textContent = catData.breeds[0].name || 'No description available';
  description.textContent =
    catData.breeds[0].description || 'No description available';
  temperament.textContent =
    catData.breeds[0].temperament || 'No information available';
  catImage.src = catData.url;
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
