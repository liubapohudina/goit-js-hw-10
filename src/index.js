import { fetchBreeds } from "./cat-api";
import SlimSelect from 'slim-select'
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_tfbjb8mOO5HvJSjWsGTwQbKurUPD8h8qvYPkqHt8O6bq14XijBFdlAlosbq3JsVv";

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  loaderText: document.querySelector('.loader-text'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};
refs.select.classList.add('is-hidden')
refs.error.classList.add('is-hidden')
refs.loader.classList.replace('is-hidden', 'loader')
refs.loaderText.classList.replace('is-hidden', 'loader')
//refs.select.addEventListener('change', handleChange)
//function handleChange(event) {
 // fetchBreeds().then(({ name, value: id }) => {
   // refs.select.innerHTML = createMarkup(name, value)
  //})
//}
  
fetchBreeds()
  .then((initialBreeds) => {
    arrBreeds = initialBreeds.map(({ name, id }) => ({ name, value: id }));
    refs.select.innerHTML = createMarkup(arrBreeds)
   new SlimSelect({
  select: refs.select
})
    refs.select.classList.remove('is-hidden')
    refs.loader.classList.replace('loader', 'is-hidden')
    refs.loaderText.classList.replace('loader-text', 'is-hidden')
  })
     
  .catch((error) => {
    console.error(error);
  });

  function createMarkup(arrBreeds) {
  return arrBreeds
    .map(
      (arr) => `
     <option value='${arr.value}'>${arr.name}</option>
      `
    )
    .join("");
}