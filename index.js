'use strict';

const state = {
  dogImageUris: [],
};

const render = function () {

  let html = '';

  state.dogImageUris.forEach((uri) => {
    html += `<li><img src="${uri}"></li>`;
  });

  $('#results').html(html);

  console.log(state);
};

const main = function () {

  $('#dogs').submit((e) => {

    e.preventDefault();

    const num = $('#num-dogs').val();

    fetch(`https://dog.ceo/api/breeds/image/random/${num}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        state.dogImageUris = json.message;
        render();
      })
      .catch((err) => {
        console.log(err);
      });
  });

};

$(main);
