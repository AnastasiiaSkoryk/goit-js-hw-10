export function fetchCountries(name) {
return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages&limit=10`)
        .then(response => { return response.json(); })
};