//OMDB apikey
const OMDB_API_Key ='6741a269';
// All Variables list
var movieContainer = document.getElementById('movie-info-container');

var searchInput = document.getElementById('search-movie');

const searchList = document.getElementById('search-list');

var searchSubmit = document.getElementById('submit-btn');

var movieDetails = document.getElementById('movie-element');

const addtoList = document.getElementById('add-movie-to-list');

//Function to retrieve search list 
async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=6741a269`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data.Search);
    if(data.Response =="True"){
   
    displayMovieList(data.Search);
    }
}

// Function to display searchlist
function displayMovieList(movies){
    searchList.innerHTML="";
    for(let i=0;i<movies.length;i++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add('search-list-item');
        if(movies[i].Poster !="N/A"){
            moviePoster = movies[i].Poster;
        }else{
            moviePoster = "./assets/image_not_found.png"
        }

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}
//Function to load each movie of the search list
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            searchInput.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}
// Function to display clicked movie information
function displayMovieDetails(details) {  
       movieDetails.innerHTML =`
       <div class="movie-poster">
           <a href="movie.html?id=${details.imdbID}"><img src="${(details.Poster != "N/A") ? details.Poster : "./assets"}" alt="poster"></a>
       </div>
       <div class="movie-title">${details.Title}</div>
       <div class="movie-tags">
           <div class="movie-rating">
               ${details.imdbRating} <i class=" fas fa-star rating-class"></i>
           </div>
           <div class="add-movie-to-list" id="${details.imdbID}" onclick="addMovieToList(${details.imdbID})">
               <i onclick="" id="plusSymbol" class="fas fa-plus plusSymbol" ></i>
           </div>
       </div> 
       `
}
// Function to find movies
function findMovies(){
    console.log('in movies')

    let searchTerm = (searchInput.value).trim();
    console.log(searchTerm);
    if(searchTerm.length>0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    }else{
        searchList.classList.add('hide-search-list');
    }

}

//Toast message related variables
var option ={
    animation : true,
    delay:2000
};
//Function for displaying toast message
function toasty(){

    var toastHTMLElement = document.querySelector(".toast");
    console.log(toastHTMLElement);

    var toastElemt = new bootstrap.Toast(toastHTMLElement,option);

    toastElemt.show();

  }


// function addMovie(val){
//    val.classList.toggle("fa-check");

// }

//Variables to store favorite list information
var MovieListArray = [];
var pastArray = [];
//Function to add movie to the favorite list
function addMovieToList(buttonID){
    var icon = document.querySelector('.plusSymbol')
    if(icon.classList.contains('fa-plus')){
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-check'); 
    }
    

    var butonIDInfo = (buttonID.id).toString();
    console.log("In the addedlist")
    console.log(butonIDInfo);
    if (!MovieListArray.includes(butonIDInfo.toString())) {
        MovieListArray.push(butonIDInfo.toString());
    }
    console.log(MovieListArray);

    toasty();

    pastArray = JSON.parse(localStorage.getItem('MovieArray'));
    if (pastArray == null) {
        localStorage.setItem('MovieArray', JSON.stringify(MovieListArray));
    }
    else{
        
        MovieListArray.forEach(ele =>{
            if (!pastArray.includes(ele)) {
                pastArray.push(ele);
            }
        })
        localStorage.setItem('MovieArray', JSON.stringify(pastArray));
    }
    console.log(pastArray);
   

    
}

