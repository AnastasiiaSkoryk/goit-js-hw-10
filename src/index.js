import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};


refs.inputEl.addEventListener('input', debounce((onInputChange), DEBOUNCE_DELAY));
function onInputChange(e) { 
    e.preventDefault();
    const countryInp = e.target.value;
    const countryToFind = countryInp.trim()
    deleteMurkup(countryToFind);
    if (countryToFind === '') {
        return;
    }
    fetchCountries(countryToFind)
        .then(renderMarkup)
        .catch(onError);
};

function createUlMarkup(countries) {
    refs.countryInfo.innerHTML = '';
    return countries.map(({ name, flags }) => {
        return `<li class="flag-name-li">
        <img
        class="country-flag"
        src="${flags.svg}"
        alt="Flag of ${name.official}"
        />
        <h1 class="country-name">${name.official}</h1></li>`;
    }
    ).join('');
};

function createDivMarkup(countries) { 
    refs.countryListEl.innerHTML = '';
    return countries.map(({ name, capital, population, flags, languages }) => {
       const allLanguage = Object.values(languages);
        return `<div class="flag-name-div">
        <img
        class="country-flag"
        src="${flags.svg}"
        alt="Flag of ${name.official}"
        />
        <h1 class="country-name">${name.official}</h1></div>
        <ul class="country-info">
        <li><span class="span">Capital:  </span>${capital}</li>
        <li><span class="span">Population:  </span>${population}</li>
        <li><span class="span">Languages:  </span>${allLanguage}</li>
        </ul>`;
    }
    ).join('');
};

function renderMarkup(country) {
    if (country.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else
    if (country.length >= 2 && country.length <= 10) {
        refs.countryListEl.innerHTML = createUlMarkup(country);
    } else {
        refs.countryInfo.innerHTML = createDivMarkup(country);
    }
};

function onError(error) {
    Notiflix.Notify.failure(`Oops, there is no country with that name`)
};

function deleteMurkup(countryToFind) {
    if (countryToFind === "") {
        refs.countryInfo.innerHTML = '';
        refs.countryListEl.innerHTML = '';
    }
};