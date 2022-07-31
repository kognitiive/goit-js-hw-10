export { fetchCoutries } 
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEFAULT_URL = 'https://restcountries.com/v2'
const searchPar = 'fields=name,capital,population,flags.svg,languages'

function fetchCoutries(name) {
    if (!name) {return}
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags.svg,languages`)
        .then((response) => {
            if (!response.ok) {
                return Notify.failure("Oops, there is no country with that name");}
            return response.json();
        });
}