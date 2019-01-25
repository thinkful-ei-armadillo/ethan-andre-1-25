'use strict';

const state = {
  results: [],
};

const API_URL = 'https://api.nps.gov/api/v1';
const API_KEY = 'K0wsvVcnGhv0iRVjnxEk0s6ZF3JhGxiBmeIJMU8U';

// const headers = new Headers({
//   'X-Api-Key': API_KEY
// });

const searchParks = function (states, limit = 10) {
  if(limit > 50) {
    throw new Error('API result max is 50.');
  }

  let stateCodes = states.join(',');
  let querystring = `?stateCode=${stateCodes}`;
  querystring += `&limit=${limit}`;
  querystring += `&api_key=${API_KEY}`;
  querystring +=`&fields=addresses`;


  return fetch(`${API_URL}/parks${querystring}`);
};

const render = function () {

  let html = '';

  state.results.forEach((s) => {
    html += `<div>`;

    html += `<strong>${s.fullName}</strong>`;
    html += `<p>${s.description}</p>`;

    s.addresses.forEach((a) => {

      html += `<p>${a.line1}</p>`;
      html += `<p>${a.line2}</p>`;
      html += `<p>${a.line3}</p>`;
      html += `<p>${a.city}</p>`;
      html += `<p>${a.stateCode}</p>`;
      html += `<p>${a.postalCode}</p>`;
      html += `<p>${a.type}</p>`;


    });

    html += `<p><a href="${s.url}">${s.url}</a></p>`;

    html+= `</div>`;
  });

  $('#results').html(html);
};

const main = function () {

  $('#search').submit((e) => {

    e.preventDefault();

    const stateCode = $('#state').val();
    const maxResults = $('#max-results').val();

    searchParks(stateCode, maxResults)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        state.results = json.data;
        render();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

$(main);
