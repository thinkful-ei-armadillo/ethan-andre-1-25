'use strict';

const main = function () {

  $('#search').submit((e) => {

    e.preventDefault();

    const state = $('#state').val();
    const maxResults = $('#max-results').val();

    console.log(state, maxResults);
  });
};

$(main);
