var API_SEARCH_URL = "http://www.omdbapi.com/?apikey=cd58487e&s="
var isFetchSS = false;
var data = []

// An object literal
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

$("#search-input").on("keyup", async function () {
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
          console.log(data);
          let results = `<li>${data[0].Title}</li><li>${data[1].Title}</li>`
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
  },2000)
  
  
})
