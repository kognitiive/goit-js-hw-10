import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCoutries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const solver = (e) => {
    const inpCountry = input.value.trim()
    if (!inpCountry) { return };
    fetchCoutries(inpCountry)
        .then(countries => {
            if (countries.length > 10) { Notify.info("Too many matches found. Please enter a more specific name."); }
            console.log(countries)
        }).catch((error) => {return error;})
};

const input = document.querySelector('#search-box')
input.addEventListener('input', debounce(solver, DEBOUNCE_DELAY))

