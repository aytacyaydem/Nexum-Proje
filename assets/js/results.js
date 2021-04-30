let results = []
let keyword = ""
let detailed = [];
var API_GET_MOVIE_URL = "https://www.omdbapi.com/?apikey=cd58487e&i="

async function getSingleMovieFromAPI(movieID){
    try {
      const response = await $.ajax({
          url: API_GET_MOVIE_URL+movieID,
          type: "GET",
          dataType: "json",
      });
     if(response.Response == "True") {
      isGetSingleSS = true;
     }else {
      isGetSingleSS = false;
     }
     return response;
  }
  catch (err) {
     console.log(err)
     return err
  }
  }

$(function() {
    results = JSON.parse(localStorage.getItem("results"));
    keyword = JSON.parse(localStorage.getItem("keyword"));
    $(".header-keyword").html(keyword+" için Sonuçlar")
    $(".header-count").html(results.length +" film bulundu")
    results.forEach(async (item,index) => {
       
        let response = await getSingleMovieFromAPI(item.imdbID)
        const x = `
        <div class="col-6 result-widget" >
        <div class="row col-md-12 h-100">
        <div class="col-md-4 img-left px-0">
        <img src="${response.Poster == "N/A" ? "https://media.comicbook.com/files/img/default-movie.png" :response.Poster }" alt="Poster Image" class="search-img" />
        </div>
        <div class="col-md-8 info-right">
        <div class="col-md-12 px-0">
        <h5 class="info-title">${response.Title} (${response.Year})</h5>
        </div>
        <div class="col-md-12 px-0 d-flex align-items-center">
        <span class="star-icon"><i class="bi bi-star-fill"></i></span><span class="info-rating">${response.imdbRating}</span><span class="rating-from">/10</span>
        </div>
        <div class="col-md-12 px-0">
        <ul class="list-unstyled">
          <li>
          <span class="key">Dil: </span>
          <span class="value">${response.Language}</span>
          </li>
          <li>
          <span class="key">Oyuncular: </span>
          <span class="value">${response.Actors} | </span><a href="javascript:void(0)" class="go-detail">Tüm listeyi gör »</a>
          </li>
        </ul>
        </div>
        <div class="col-md-12 px-0">
        <p class="plot-text">${response.Plot}</p>
        <a href="javascript:void(0)" class="go-detail">Detaylar »</a>
        </div>
        </div>
        </div>
        </div>
        `
        $("#resultRow").append(x)
        // if($("#resultRow").children().length % 2 == 0) {
        //     console.log($("#resultRow").children().length);
        //     $("#resultRow").append(`<div class="divider"</div>`)
        // }
        if(index+1 == results.length) {
            $("#resultRow").children().each((index,element) => {
                    let a =  $("#resultRow").children(`:nth-child(${index+1}), :nth-child(${index+2})`)
              
            })
        } 
        
    })
   
    
})