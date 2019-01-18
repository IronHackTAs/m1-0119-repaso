/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  return movies.map(function(movie) {
    var hours = 0;
    var minutes = 0;

    if (movie.duration.indexOf("h") != -1) {
      hours = parseInt(movie.duration.slice(0, movie.duration.indexOf("h")));
    }

    if (movie.duration.indexOf("m") != -1) {
      minutes = parseInt(
        movie.duration.slice(
          movie.duration.indexOf("m") - 2,
          movie.duration.indexOf("m")
        )
      );
    }

    var duration = hours * 60 + minutes;

    return Object.assign({}, movie, { duration: duration });
  });
}

// Get the average of all rates with 2 decimals
function ratesAverage(movies) {
  var avg =
    movies.reduce(function(acc, movie) {
      if (movie.rate) {
        return acc + parseFloat(movie.rate);
      } else {
        return acc;
      }
    }, 0) / movies.length;

  return parseFloat(avg.toFixed(2));
}

function filterDrama(movies) {
  return movies.filter(function(movie) {
    return movie.genre.indexOf("Drama") != -1;
  });
}

// Get the average of Drama Movies
function dramaMoviesRate(movies) {
  var dramaMovies = filterDrama(movies);

  if (dramaMovies.length == 0) return;

  return ratesAverage(dramaMovies);
}

// Order by time duration, in growing order
function orderByDuration(movies) {
  return movies.sort(function(a, b) {
    if (a.duration > b.duration) {
      return 1;
    } else if (a.duration < b.duration) {
      return -1;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
}

// How many movies did STEVEN SPIELBERG
function howManyMovies(movies) {
  if (movies.length == 0) return;

  var dramaMovies = filterDrama(movies);

  var result = dramaMovies.filter(function(movie) {
    return movie.director == "Steven Spielberg";
  }).length;

  return `Steven Spielberg directed ${result} drama movies!`;
}

// Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  var sortedMovies = movies.sort(function(movie1, movie2) {
    return movie1.title.localeCompare(movie2.title);
  });

  var titleMovies = sortedMovies.map(function(movie) {
    return movie.title;
  });

  return titleMovies.slice(0, 20);
}

// Best yearly rate average
function bestYearAvg(movies) {
  if (movies.length === 0) {
    return;
  }

  var moviesYear = {};

  // order movies by year
  movies.forEach(function(movie) {
    if (moviesYear[movie.year]) {
      moviesYear[movie.year].push(movie);
    } else {
      moviesYear[movie.year] = [movie];
    }
  });

  // get average rate by year
  var avgYear = {};

  Object.keys(moviesYear).forEach(function(year) {
    var totalMovies = 0;
    var totalRate = 0;
    var yearMovies = moviesYear[year];

    yearMovies.forEach(function(movie) {
      totalMovies++;
      totalRate += parseFloat(movie.rate);
    });

    avgYear[year] = parseFloat((totalRate / totalMovies).toFixed(2));
  });

  // get best average
  var yearBestAvg = Object.keys(avgYear).reduce(function(acc, year) {
    if (avgYear[acc] === avgYear[year]) {
      if (acc > year) {
        return year;
      } else {
        return acc;
      }
    } else if (avgYear[acc] > avgYear[year]) {
      return acc;
    } else {
      return year;
    }
  });

  return ("The best year was " + yearBestAvg + " with an average rate of " + avgYear[yearBestAvg]);
}
