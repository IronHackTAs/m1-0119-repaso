/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 
//"2h 22min"
//"3h"
//"55min"
function turnHoursToMinutes(movies) {
  return movies.map(function(movie){
    var hours = 0;
    var minutes = 0;

    if(movie.duration.indexOf('h') != -1) {
      hours = movie.duration.slice(0, movie.duration.indexOf('h'))
    }

    if(movie.duration.indexOf('m') != -1) {
      var minutesPosition = movie.duration.indexOf('m');
      minutes = movie.duration.slice(minutesPosition-2, minutesPosition);
    }

    var duration = hours*60 + parseInt(minutes);

    return Object.assign({}, movie, {duration: duration})
  })
}

// Get the average of all rates with 2 decimals 
function ratesAverage(movies) {
  var avg = movies.reduce(function(acc, movie) {
    return acc + parseFloat(movie.rate)
  }, 0)/movies.length;

  return parseFloat(avg.toFixed(2));
}

// Get the average of Drama Movies


// Order by time duration, in growing order


// How many movies did STEVEN SPIELBERG


// Order by title and print the first 20 titles


// Best yearly rate average
