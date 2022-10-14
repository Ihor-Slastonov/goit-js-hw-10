const BASE_URL = 'https://restcountries.com/v3.1/name/';
const searchFilter = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
});

export function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}?${searchFilter}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(console.log('fail'))
            }
            return response.json();
        });
}
