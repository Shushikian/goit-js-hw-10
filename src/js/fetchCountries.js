import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name) {
    const site = `https://restcountries.com/v3.1/name/${name}?fields=capital,population,flags,languages,name`;

    return fetch(site)
        .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
        .catch(error => {
            console.log(error);
            notification()
        });
};

function notification() {
    Notify.failure('Oops, there is no country with that name');
};