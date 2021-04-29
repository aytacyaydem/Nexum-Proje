var API_SEARCH_URL = "http://www.omdbapi.com/?apikey=cd58487e&s="
var API_GET_MOVIE_URL = "http://www.omdbapi.com/?apikey=cd58487e&i="
var isFetchSS = false;
var isGetSingleSS = false;
var data = []
var completeMovie1 = {}
var completeMovie2 = {}

var app = {
  init: function() {
    app.functionOne();
  },
  functionOne: function () {
  },
  scrollTop: function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
};
(function() {
  // your page initialization code here
  // the DOM will be available here
  app.init();
})();
$(function() {
  $("#result-row").hide();
})

async function getMoviesFromAPI(searchQuery){
  try {
    const response = await $.ajax({
        url: API_SEARCH_URL+searchQuery,
        type: "GET",
        dataType: "json",
    });
   if(response.Response == "True") {
    isFetchSS = true;
    data = response.Search
   }else {
     isFetchSS = false;
     data = [];
   }
   return response;
}
catch (err) {
   console.log(err)
   return err
}
}

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

$("#search-input").on("keyup", async function (e) {
  if(e.which == "16") {
    return
  }
  console.log(e)
  $(".search-list").html("")
  $('#search').removeClass("work-animation")
  setTimeout(async () => {
    var query = $(this).val();
    if(query.length > 2) {
      await getMoviesFromAPI(query);
      if(data.length > 0) {
        $('#search').addClass("work-animation");
        $(".search-list").removeClass("d-none");
        $(".search-list").addClass("d-block");
        
        if(data.length > 1) {
          completeMovie1 = await getSingleMovieFromAPI(data[0].imdbID)
          completeMovie2 = await getSingleMovieFromAPI(data[1].imdbID)
          console.log(data);
          let results = `
          <li>
          <div class="col-md-12 d-flex">
          <div class="col-md-4 img-left">
          <img src="${data[0].Poster == "N/A" ? "https://media.comicbook.com/files/img/default-movie.png" :data[0].Poster }" alt="Poster Image" class="search-img img-fluid" />
          </div>
          <div class="col-md-8 info-right">
          <div class="col-md-12 px-0">
          <h5 class="info-title">${data[0].Title} (${data[0].Year})</h5>
          </div>
          <div class="col-md-12 px-0 d-flex align-items-center">
          <span class="star-icon"><i class="bi bi-star-fill"></i></span><span class="info-rating">${completeMovie1.imdbRating}</span><span class="rating-from">/10</span>
          </div>
          <div class="col-md-12 px-0">
          <ul class="list-unstyled">
            <li>
            <span class="key">Dil: </span>
            <span class="value">${completeMovie1.Language}</span>
            </li>
            <li>
            <span class="key">Oyuncular: </span>
            <span class="value">${completeMovie1.Actors} | </span><a href="javascript:void(0)" class="go-detail">Tüm listeyi gör »</a>
            </li>
            
          </ul>
          </div>
          <div class="col-md-12 px-0">
          <p class="plot-text">${completeMovie1.Plot}</p>
          <a href="javascript:void(0)" class="go-detail">Detaylar »</a>
          </div>
          </div>
          </div>
          <hr />
          </li>


          <li>
          <div class="col-md-12 d-flex">
          <div class="col-md-4 img-left">
          <img src="${data[1].Poster == "N/A" ? "https://media.comicbook.com/files/img/default-movie.png" :data[1].Poster }" alt="Poster Image" class="search-img img-fluid" />
          </div>
          <div class="col-md-8 info-right">
          <div class="col-md-12 px-0">
          <h5 class="info-title">${data[1].Title} (${data[1].Year})</h5>
          </div>
          <div class="col-md-12 px-0 d-flex align-items-center">
          <span class="star-icon"><i class="bi bi-star-fill"></i></span><span class="info-rating">${completeMovie2.imdbRating}</span><span class="rating-from">/10</span>
          </div>
          <div class="col-md-12 px-0">
          <ul class="list-unstyled">
            <li>
            <span class="key">Dil: </span>
            <span class="value">${completeMovie2.Language}</span>
            </li>
            <li>
            <span class="key">Oyuncular: </span>
            <span class="value">${completeMovie2.Actors} | </span><a href="javascript:void(0)" class="go-detail">Tüm listeyi gör »</a>
            </li>
            
          </ul>
          </div>
          <div class="col-md-12 px-0">
          <p class="plot-text">${completeMovie2.Plot}</p>
          <a href="javascript:void(0)" class="go-detail">Detaylar »</a>
          </div>
          </div>
          </div>
          </li>
          
          `
          $(".search-list").html(results)
          $("#result-row").removeClass("d-none");
          $("#result-row").addClass("d-flex");
        }else {
          console.log(data);
          let results = `<li>${data[0].Title}</li>`
          $(".search-list").html(results)
          $("#result-row").removeClass("d-none");
          $("#result-row").addClass("d-flex");
        }
      } 
      if(data.length <= 0) {
        $(".search-list").html("")
        $("#result-row").removeClass("d-flex");
        $("#result-row").addClass("d-none");
        $(".search-list").removeClass("d-block");
        $(".search-list").addClass("d-none");
        $('#search').removeClass("work-animation");
       
      }   
    }else {
      $(".search-list").html("")
      $("#result-row").removeClass("d-flex");
      $("#result-row").addClass("d-none");
      $(".search-list").removeClass("d-block");
      $(".search-list").addClass("d-none");
    }
    if($(".search-list").hasClass("d-block")){
      $("#search").css("margin-top","14rem");
    }else {
      $("#search").css("margin-top","0px");
    }
  },1500)
  if($(this).val().length <= 2 || data.length == 0) {
    $(".search-list").html("")
    $("#result-row").removeClass("d-flex");
    $("#result-row").addClass("d-none");
    $(".search-list").removeClass("d-block");
    $(".search-list").addClass("d-none");
    $("#search").css("margin-top","0px");
  }
  
  
})
