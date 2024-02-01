document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "12e021b4aa91b78ebc2e2219d8c8367d";
  const moviesContainer = document.getElementById("movies-container");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // Fetch popular movies on page load
  fetchMovies("popular");

  // Add event listener for the search button
  searchButton.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query !== "") {
      fetchMovies("search", query);
    }
  });

  function fetchMovies(endpoint, query = "") {
    // Define the API endpoint based on the request type
    const apiUrl =
      endpoint === "search"
        ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&query=${query}`
        : `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&page=1`;

    // Fetch movies from TMDb API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Clear existing movies
        moviesContainer.innerHTML = "";

        // Display movies based on the fetched data
        data.results.forEach((movie) => {
          const movieDiv = createMovieElement(movie);
          moviesContainer.appendChild(movieDiv);
        });
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }

  function createMovieElement(movie) {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "placeholder-image.jpg";
    movieDiv.innerHTML = `
            <img src="${imageUrl}" alt="${movie.title}">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>Release Date: ${movie.release_date}</p>
                <p>Rating: ${movie.vote_average}</p>
            </div>
        `;

    return movieDiv;
  }
});
