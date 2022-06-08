
// Getting the local Storage Information and assigning to list array
var storageInfo = localStorage.getItem('MovieArray');
var listArray = JSON.parse(storageInfo);
// console.log(listArray);

//Calling the each item of the movie by id
listArray.forEach(async id=>{
    loadMovies(id);
});


// Retrieving the each item of the list by id
async function loadMovies(id){
    const URL = `https://www.omdbapi.com/?i=${id}&apikey=6741a269`;
    console.log(URL);
    const res = await fetch(`${URL}`);
    const movieDetails = await res.json();
    console.log(movieDetails.Title);
    if(movieDetails.Response =="True"){
   
    displayMovieDetails(movieDetails);
    }
}
// Displaying the each movie element of the list
function displayMovieDetails(details) {  
    var favList = document.createElement('div');
    favList.classList.add('list-item');
    favList.innerHTML =`
    <div class="movie-details">
                <div class="thumbnail">
                    <img src="${details.Poster}" alt="thumbnail">
                </div>
                <div class="title">
                    <a href="movie.html?id=${details.imdbID}"> ${details.Title} </a> 
                    <span>Duration: ${details.Runtime} | Released on: ${details.Released}</span>
                </div>
                <div class="delete-movie-from-list" id="${details.imdbID}" onclick="deleteItem(${details.imdbID})">
                    <i class="fas fa-trash-alt"></i>
                </div>
                    
    `;
    // console.log("Aslu",details.imdbID);
    document.getElementById('movie-container').appendChild(favList);
}
//Function to delete each movie item from the list
async function deleteItem(buttonID){
    var butonIDInfo = (buttonID.id).toString();
    // console.log("insidedelte");
    console.log(butonIDInfo);
    if(window.confirm('Do you want to delete this Movie from list?')){
        console.log(butonIDInfo);
        var temp = await JSON.parse(localStorage.getItem('MovieArray'));
        var index = await temp.indexOf(butonIDInfo.toString());
        await temp.splice(index,1);
        await localStorage.setItem('MovieArray', JSON.stringify(temp));
        window.location.reload();
    }

}
//Function to delete all movies of the list
function clearAll () { 
    if(window.confirm("Do you want to clear your favorite list?")){
        localStorage.clear();
        window.location.reload();
    }
    
   
 }