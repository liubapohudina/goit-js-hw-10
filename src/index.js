import axios from "axios";
import './common.css';
import { fetchBreeds } from "./cat-api";
axios.defaults.headers.common["x-api-key"] = "live_tfbjb8mOO5HvJSjWsGTwQbKurUPD8h8qvYPkqHt8O6bq14XijBFdlAlosbq3JsVv";

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}
refs.select.classList.add('is-hidden')
refs.error.classList.add('is-hidden')

const body = document.querySelector('body')

body.addEventListener('onload', fetchBreeds)

