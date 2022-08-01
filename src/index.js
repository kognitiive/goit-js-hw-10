import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCoutries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box')
const contriesList = document.querySelector('.country-list')
const country = document.querySelector('.country-info')
inputRef.addEventListener('input', debounce(solver, DEBOUNCE_DELAY))

function solver(e) {
    const inpCountry = inputRef.value.trim()
    if (!inpCountry) { return };
    fetchCoutries(inpCountry)
        .then(countries => {
            if (!countries) { return resetMarkup()} 
            resetMarkup()
            if (countries.length > 10) {return Notify.info("Too many matches found. Please enter a more specific name."); }
            if (countries.length === 1) {return renderCountryMarkup(countries)}
            if (countries.length > 1) {return renderCountriesList(countries)}    
            console.log(countries)
        })
    
};

function resetMarkup() { 
    contriesList.innerHTML = '';
    country.innerHTML = '';
}

function renderCountriesList(arr) {
    const markup = arr.map(({ flags, name }) => {
        const flagSvg = flags.svg;
        return `<li>
            <img src=${flagSvg}></img>
            <p>${name}</p>
            </li>`
    }).join('');
    contriesList.innerHTML = markup;
}

function renderCountryMarkup(arr) { 
    const markup = arr.map(({ flags, name, capital, population, languages }) => {
        const flagSvg = flags.svg;
        const listLanguages = languages.map(lang => lang.name);
        return `<div class='wrapper'>
            <img src=${flagSvg}></img>
            <p class='wrapper__text'>${name}</p>
            </div>
            <div>
                <p class='text'>Capital:
                    <span class='span'>${capital}</span>
                </p>
            </div>
            <div>
                <p class='text'>Population:
                    <span class='span'>${population}</span>
                </p>
            </div>
            <div>
                <p class='text'>Languages:
                    <span class='span'>${listLanguages}</span>
                </p>
            </div>`
    });
    country.innerHTML = markup;
}





