var directions = 
    [
      {
        name: "N",
        min: 348.75,
        max: 11.25 
      },
      {
        name: "NNE",
        min: 11.25,
        max: 33.75 
      },
      {
        name: "NE",
        min: 33.75,
        max: 56.25 
      },
      {
        name: "ENE",
        min: 56.25,
        max: 78.75 
      },
      {
        name: "E",
        min: 78.75,
        max: 101.25 
      },
      {
        name: "ESE",
        min: 101.25,
        max: 123.75 
      },
      {
        name: "SE",
        min: 123.75,
        max: 146.25 
      },
      {
        name: "SSE",
        min: 146.25,
        max: 168.75 
      },
      {
        name: "S",
        min: 168.75,
        max: 191.25 
      },
      {
        name: "SSW",
        min: 191.25,
        max: 213.75 
      },
      {
        name: "SW",
        min: 213.75,
        max: 236.25 
      },
      {
        name: "WSW",
        min: 236.25,
        max: 258.75 
      },
      {
        name: "W",
        min: 258.75,
        max: 281.25 
      },
      {
        name: "WNW",
        min: 281.25,
        max: 303.75 
      },
      {
        name: "NW",
        min: 303.75,
        max: 326.25 
      },
      {
        name: "NNW",
        min: 326.25,
        max: 348.75 
      }
    ];
 
    // $.getJSON('http://allorigins.me/get?url=' + encodeURIComponent("https://www.wunderground.com/weather/us/ga/atlanta") + '&callback=?', function(data){
    //   // console.log(data.contents);
      
    //   var el = $( '<div></div>' );
    //   el.html(data.contents);
    //   let weather = $('.city-conditions', el);
    //   // console.log(weather[0]);
    //   let hi = $('.hi', weather[0]);
    //   let lo = $('.lo', weather[0]);
    //   let pic = $('img', weather[0]);
    //   let picLink = pic[0].attributes[1].nodeValue;
    //   let feels = $('.temp', weather[0]);
    //   let conditionHolder = $('.condition-icon', weather[0]);
    //   let condition = $('p', conditionHolder);
    //   $('#hi').append(hi);
    //   $('#lo').append(lo);
    //   $('#img').html(`<img src="http:${picLink}">`);
    //   $('#feels').append(feels[0].innerHTML);
    //   $('#condition').append(condition[0].innerHTML);
    // });
    
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
  $.getJSON(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${keys[0].key}`, function(data){
  
  console.log(data);
  $('#hi').append(data.main.temp_max + '&deg;');
  $('#lo').append(data.main.temp_min + '&deg;');
  $('#img').html(`<img src="http://openweathermap.org/img/w/${data.weather["0"].icon}.png">`);
  $('#condition').append(data.weather["0"].description);
  $('#humid').append(`${data.main.humidity}% Humidity`);
  $('#wind').append(`Wind ${data.wind.speed} MPH`);
  $('#location').append(` ${data.name}`)
  
  for (var i = 0; i < directions.length; i++) {
    
    if (data.wind.deg > 348.75 || data.wind.deg <= 11.25 ) {
      $('#dir').append("N");
    }
    else if (data.wind.deg > directions[i].min && data.wind.deg <= directions[i].max) {
      $('#dir').append(directions[i].name);
      // console.log(i, data.wind.deg, directions[i].min, directions[i].max)
    }
  }
  
})
}

getLocation();