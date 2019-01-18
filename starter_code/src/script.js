window.onload = function() {
  var yearButton = document.querySelector("#btn-year");
  yearButton.onclick = getYearMovies;
}

function getYearMovies() {
  var year = document.querySelector("#yearMovie").value;
  
  if(year) {
    var moviesFilter = movies.filter(function(movie) {
      return movie.year == year;
    })

    moviesFilter.forEach(function(movie) {
      var movieContainer = document.createElement("div");
      movieContainer.innerHTML = `<h2>${movie.title}</h2>`;
      movieContainer.innerHTML += `<p class="director">${movie.director}</p>`;
      
      var body = document.querySelector("body");
      body.appendChild(movieContainer);
    })
  }
}