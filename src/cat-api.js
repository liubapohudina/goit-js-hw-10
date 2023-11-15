import axios from "axios";

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
      throw new Error("Failed to fetch breeds");
    });
}
