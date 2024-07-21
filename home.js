let imdbIdArray = []
let searchResArray = []
let watchlistIDArray = [];
let resultHtml = ``
let watchlistEls
const searchResultEl = document.getElementById("search-result")
const searchBtnEl = document.getElementById("search-btn")
const exploreImgEl = document.getElementById("explore-img")
const loader = document.querySelector("#loading");
// loader

function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}


document.getElementById("search-btn").addEventListener("click", ()=>{
    searchResultEl.innerHTML = ``
    resultHtml = ``
    searchResArray = []
    imdbIdArray = []
    displayLoading()
    exploreImgEl.classList.add("display-none-class")
    let movieName = document.getElementById("movie-input").value
    movieName = movieName.replace(/\s/g, '+')
    getId(movieName)
})

async function getId(movieName){
    const res = await fetch(`https://www.omdbapi.com/?apikey=613887e4&s=${movieName}&type=movie`)
    const data = await res.json()
    const searchRes = data.Search
    //storing imdbID in array
    for(let movie in searchRes){
        imdbIdArray.push(searchRes[movie].imdbID)
    }
    storeData()
}

async function storeData(){
        //fetching through their id's and storing in array
        for(let i in imdbIdArray){
            let res = await fetch(`https://www.omdbapi.com/?apikey=613887e4&i=${imdbIdArray[i]}`)
            let data = await res.json()
            console.log(data)
            searchResArray.push(data)
        }
        renderHtml(searchResArray)
    
}


function renderHtml(arr){
    
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

    hideLoading()
    searchResultEl.innerHTML = resultHtml
    watchlistEls = document.querySelectorAll(".watchlist-btn-container")
    watchlistBtnWork(watchlistEls)
}

function watchlistBtnWork(watchlistEls){
    watchlistEls.forEach(element => {
        element.addEventListener("click", (e)=>{
            let imageIconNode = e.currentTarget.children[0].querySelector('.watchlist-icon')
            imageIconNode.src = "assets/icon2.png"
            let parentNodeId = e.currentTarget.parentNode.id
            watchlistIDArray.push(parentNodeId)
            console.log(watchlistIDArray)  
            localStorage.setItem("movieIDs", JSON.stringify(watchlistIDArray))
        })
    })
    
}

