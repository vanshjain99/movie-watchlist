


fetch("http://www.omdbapi.com/?apikey=613887e4&s=blade+runner")
    .then(res=>res.json())
    .then(data=>console.log(data))