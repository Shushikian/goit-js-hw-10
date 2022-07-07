import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onKlick, DEBOUNCE_DELAY));

function onKlick (res) {
    const inputText = res.target.value.trim();

    if (inputText === '') {
        return notificationNoname();
    }
    fetchCountries(inputText).then(htmlMurkUp).catch(console.log(error));
}

function htmlMurkUp(res) {
    countryInfo.innerHTML = ``;
    countryList.innerHTML = ``;
    if (res.length >= 10) {
        Notify.failure('Too many matches found. Please enter a more specific name.')
    }
    if (res.length < 10 && res.length >= 2) {
       countryList.innerHTML = murkUpList(res);
    }
    if (res.length === 1) {
       countryInfo.innerHTML = murkUpCountry(res);
    }
};


function murkUpList(array) {
  return array
    .map(
      el =>
        `<li class="list-item country-list__item"><img src="${el.flags.svg}" class="img" ></img><p>${el.name.official}</p></li>`
    )
    .join('');
}

function murkUpCountry(argCountry) {
  const [country] = argCountry;
  const { name, population, flags, capital, languages } = country;
  const langArray = Object.values(languages);

  return `<ul class="">
        <li class="list-item"><img src="${flags.svg}" class="img"></img></li>
        <li class="list-item"><h2>${name.official}</h2></div></li>
        <li class="list-item"><p><b>Capital: </b>${capital}</p>
        <li class="list-item"><p><b>Population: </b>${population}</p></li>
        <li class="list-item"><p><b>Languages: </b>${langArray.join(', ')}</p></li>
    </ul>`;
}

function notification() {
    Notify.failure('Oops, there is no country with that name');
};


function notificationNoname() {
    Notify.failure('Enter name of country!');
};