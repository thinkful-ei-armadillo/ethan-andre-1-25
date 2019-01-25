'use strict';

const main = function () {

  $('#dogs').submit((e) => {

    e.preventDefault();

    const num = $('#num-dogs').val();

    console.log(num);
  });

  console.log('boot');
};

$(main);
