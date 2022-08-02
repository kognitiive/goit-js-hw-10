export { fetchCoutries }

const DEFAULT_URL = 'https://restcountries.com/v2'
const searchPar = 'fields=name,capital,population,flags,languages'

function fetchCoutries(name) {
    return fetch(`${DEFAULT_URL}/name/${name}?${searchPar}`)
        .then(response => {
            if (!response.ok) {throw new Error(response.status);}
            return response.json();
        })
}