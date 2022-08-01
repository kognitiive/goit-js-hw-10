export { fetchCoutries } 
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEFAULT_URL = 'https://restcountries.com/v2'
const searchPar = 'fields=name,capital,population,flags,languages'

function fetchCoutries(name) {
    if (!name) {return}
    return fetch(`${DEFAULT_URL}/name/${name}?${searchPar}`)
        .then((response) => {
            if (!response.ok) {return Notify.failure("Oops, there is no country with that name");}
            return response.json();
        })
}