let watchlistIDArray = JSON.parse(localStorage.getItem("movieIDs"))
console.log(watchlistIDArray)
let watchlistMovieArray = []
const watchlistResultEl = document.getElementById("watchlist-result")
let resultHtml = ``

getWatchlist()
async function getWatchlist(){
    for (let i in watchlistIDArray){
        let res = await fetch(`http://www.omdbapi.com/?apikey=613887e4&i=${watchlistIDArray[i]}`)
        let data = await res.json()
        watchlistMovieArray.push(data)
    }
    renderHtml(watchlistMovieArray)

}

function renderHtml(searchResArray){
    for(let mov in searchResArray){
        let moviePoster = searchResArray[mov].Poster
        let movieTitle = searchResArray[mov].Title 
        let movieRating = searchResArray[mov].imdbRating
        let movieRuntime = searchResArray[mov].Runtime 
        let movieGenre = searchResArray[mov].Genre 
        let moviePlot = searchResArray[mov].Plot 
        let movieId = searchResArray[mov].imdbID
        
        resultHtml += `
        <div class="result-movie" id="${movieId}">
            <img class="poster" src="${moviePoster}"/>
            <h2 class="mov-title">${movieTitle}</h2>
            <p class="rating">⭐${movieRating}</p>
            <p class="duration">${movieRuntime}</p>
            <p class="genre">${movieGenre}</p>
            <div class="watchlist-btn-container">
                <div class="watchlist-btn">
                    <img class="watchlist-icon" src="assets/Icon.png"/>
                    <p>Watchlist</p>
                </div>
            </div>
            <p class="description">${moviePlot}</p>
        </div>
        `


    }

    watchlistResultEl.innerHTML = resultHtml
}