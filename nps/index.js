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
    html += `<li>`;

    html += `<h2>${s.fullName}</h2>`;
    html += `<a href=""${s.url}>${s.url}</a>`;
    html += `<p>${s.description}</p>`;

    html += '<ul>';
    s.addresses.forEach((a) => {

      html += '<li>';
      html += `<p><strong>${a.type} Address</strong></p>`;

      html += '<p>';
      html += `${a.line1}<br>`;

      if (a.line2) { html += `${a.line2}<br>`; }
      if (a.line3) { html += `${a.line3}<br>`; }

      html += `${a.city}<br>`;
      html += `${a.stateCode}<br>`;
      html += `${a.postalCode}<br>`;
      html += '</p>';
      html += '</li>';

    });
    html += '</ul>';

    html+= `</li>`;
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
