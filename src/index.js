import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_tfbjb8mOO5HvJSjWsGTwQbKurUPD8h8qvYPkqHt8O6bq14XijBFdlAlosbq3JsVv";

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  loaderText: document.querySelector('.loader-text'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.select.classList.add('is-hidden');
refs.error.classList.add('is-hidden');
refs.loader.classList.replace('is-hidden', 'loader');
refs.loaderText.classList.replace('is-hidden', 'loader');
refs.select.addEventListener('change', handleChange);

function handleChange(event) {
  const breedId = event.currentTarget.value;
  refs.loader.classList.replace('is-hidden', 'loader')
   refs.loaderText.classList.replace('is-hidden', 'loader-text')
  fetchCatByBreed(breedId)
    .then((data) => {
      //refs.select.classList.add('is-hidden')
      refs.loader.classList.replace('loader', 'is-hidden')
      refs.loaderText.classList.replace('loader-text', 'is-hidden')
      const catInfoMarkup = createMarkupId(data);
      console.log(catInfoMarkup)
      refs.catInfo.innerHTML = catInfoMarkup;
    })
    .catch((error) => {
      refs.select.classList.add('is-hidden')
      console.error(error);
      Notiflix.Notify.failure("Failed to fetch cat information");
    });
}

fetchBreeds()
  .then((initialBreeds) => {
    const arrBreeds = initialBreeds.map(({ name, id }) => ({ name, value: id }));
    refs.select.innerHTML = createMarkup(arrBreeds);
    
  new SlimSelect({
        select: '#selectElement'
      })
    
    refs.select.classList.remove('is-hidden');
    refs.loader.classList.replace('loader', 'is-hidden');
    refs.loaderText.classList.replace('loader-text', 'is-hidden');
  })
  .catch((error) => {
    console.error(error);
    Notiflix.Notify.failure("Failed to fetch breeds");
  });

function createMarkup(arrBreeds) {
  return arrBreeds
    .map((arr) => `
      <option value='${arr.value}'>${arr.name}</option>
    `)
    .join("");
}

function createMarkupId(selectCat) {
  return selectCat.map((arr) => `
    <div class="box-cat">
      <h1>${arr.breeds[0].name}</h1>
      <img src=${arr.url} alt=${arr.breeds[0].name} width='400'/>
      <p>${arr.breeds[0].description}</p>
      <p>${arr.breeds[0].temperament}</p>
    </div>
  `).join("");
}
