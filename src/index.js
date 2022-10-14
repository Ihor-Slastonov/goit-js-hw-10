import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries.js';
import markupList from './templates/countryList.hbs';
import markupItem from './templates/countryItem.hbs';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputSearch = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


inputSearch.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));
Notify.init({
    position: "left-top"
})
function onSearchInput(e) {
    clear()
    const name = e.target.value.trim();
    if (name === '') {
        return Notify.info(
            `It can't be empty field! Please, fill it up with at least two letters!`
        );
    }
    fetchCountries(name)
        .then(data => {
            if (data.length > 10) {
                return Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                );
            }
            if (data.length === 1) {
                countryInfo.insertAdjacentHTML('beforeend', markupItem(data))
            }
            if (data.length > 2 && data.length < 10) {
                return countryList.insertAdjacentHTML('beforeend', markupList(data))
            }

        })
        .catch(err => Notify.failure("Oops, there is no country with that name"));
}

function clear() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}