export function fetchCountries(name) {
    const site = `https://restcountries.com/v3.1/name/${name}?fields=capital,population,flags,languages,name`;

    return fetch(site)
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            
        });
};