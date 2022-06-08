//variables information
var movieDetails = document.getElementById('movie-page');
let id = '';
//Below code to get movie id from the URL
const urlParams = new URLSearchParams(location.search);
for(const [key, value] of urlParams) {
    id = value;
}
console.log(id)

//For retrieving the movie information
loadMovies(id);
async function loadMovies(id){
    const URL = `http://www.omdbapi.com/?i=${id}&apikey=6741a269`;
    console.log(URL);
    const res = await fetch(`${URL}`);
    const movieDetails = await res.json();
    console.log(movieDetails.Title);
    if(movieDetails.Response =="True"){
   
    displayMovieDetails(movieDetails);
    }
}

//For displaying the moovie
function displayMovieDetails(details) {  
    movieDetails.innerHTML =`
                    <div class="movie-poster my-0 mx-5 h-90">
                        <img class="h-100 w-auto" src="${details.Poster}" alt="poster">
                    </div>

                    <div class="movie-details">
                        <div class="movie-title my-2 font-monospace ">
                            ${details.Title}
                        </div>
                        <div class="movie-duration-release-date-trailer d-flex flex-column my-2 ">
                            <div class="movie-duration">
                                <i class="fas fa-clock"></i> ${details.Runtime}
                            </div>
                            <div class="release">
                                Released:${details.Released}
                            </div>
                            <div class="language">
                                Language:${details.Language}
                            </div>
                            <div class="actors">
                                Actors : ${details.Actors}
                            </div>
                            <div class="movie-rating">
                                Rating: ${details.imdbRating}
                            </div>
                            <h2>Plot</h2>
                            <div class="plot">
                             ${details.Plot}
                            </div>
    `
}