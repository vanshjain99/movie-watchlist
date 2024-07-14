

let imdbIdArray = []
let searchResArray = []
let resultHtml = ``

const searchResultEl = document.getElementById("search-result")
const searchBtnEl = document.getElementById("search-btn")


getId()
async function getId(){
    const res = await fetch("http://www.omdbapi.com/?apikey=613887e4&s=blade+runner")
    const data = await res.json()
    console.log(data)
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
            let res = await fetch(`http://www.omdbapi.com/?apikey=613887e4&i=${imdbIdArray[i]}`)
            let data = await res.json()
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
                    <img src="assets/Icon.png"/>
                    <p>Watchlist</p>
                </div>
            </div>
            <p class="description">${moviePlot}</p>
        </div>
        `


    }

    searchResultEl.innerHTML = resultHtml
}

