'use strict';

const state = {
  dogImageUri: '',
};

const render = function () {
  $('#results').html(`<li><img src="${state.dogImageUri}"></li>`);
};

const main = function () {

  $('#dogs').submit((e) => {

    e.preventDefault();

    const dogBreed = $('#dog-breed').val();

    fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if(json.code === '404') {
          throw new Error('Breed not found');
        }

        state.dogImageUri = json.message;
        render();
      })
      .catch((err) => {
        console.log(err);
      });
  });

};

$(main);
