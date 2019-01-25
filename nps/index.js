'use strict';

const API_URL = 'https://api.nps.gov/api/v1';
const API_KEY = 'K0wsvVcnGhv0iRVjnxEk0s6ZF3JhGxiBmeIJMU8U';

const headers = new Headers({
  'X-Api-Key': API_KEY
});

const searchParks = function (states, limit = 10) {
  if(limit > 50) {
    throw new Error('API result max is 50.');
  }

  let stateCodes = states.join(',');
  let querystring = `?stateCode=${stateCodes}`;
  querystring += `&limit=${limit}`;

  fetch(`${API_URL}/parks${querystring}`, headers)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};

const main = function () {

  $('#search').submit((e) => {

    e.preventDefault();

    const state = $('#state').val();
    const maxResults = $('#max-results').val();

    searchParks(state, maxResults);

    console.log(state, maxResults);
  });
};

$(main);
