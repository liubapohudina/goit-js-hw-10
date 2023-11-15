import { fetchBreeds } from "./cat-api";
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_tfbjb8mOO5HvJSjWsGTwQbKurUPD8h8qvYPkqHt8O6bq14XijBFdlAlosbq3JsVv";

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  loaderText: document.querySelector('loader-text'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
refs.loader.classList.replace('loader', 'is-hidden');
refs.loaderText.classList.add('is-hidden');
refs.error.classList.add('is-hidden')

refs.select.addEventListener('onload', handleChange);

let arrBreeds = [];

function handleChange(event) {
  event.preventDefault();
  refs.select.classList.remove('is-hidden')
  const selectCat = event.currentTarget.value;
  fetchBreeds(selectCat)
    .then((breeds) => {
      // Assuming breeds is an array of objects with 'name' and 'id' properties
      arrBreeds = breeds.map(({ name, id }) => ({ name, value: id }));

      // Call your function to update the HTML
      updateSelectOptions(arrBreeds);
    })
    .catch((error) => {
      console.error(error);
    });
}

function updateSelectOptions(arrBreeds) {
  const markup = createMarkup(arrBreeds);
  refs.select.innerHTML = markup;
}

function createMarkup(arrBreeds) {
  return arrBreeds
    .map(
      (arr) => `
     <option value='${arr.value}'>${arr.name}</option>
      `
    )
    .join("");
}

// You might want to call fetchBreeds initially to populate the select element when the page loads
fetchBreeds()
  .then((initialBreeds) => {
    arrBreeds = initialBreeds.map(({ name, id }) => ({ name, value: id }));
      updateSelectOptions(arrBreeds);
      refs.loader.style = 'none';
  })
  .catch((error) => {
    console.error(error);
  });
