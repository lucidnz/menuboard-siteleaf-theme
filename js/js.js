/*
 * Starts any clocks using the user's local time
 * From: cssanimation.rocks/clocks
 */
function initLocalClock() {
  // Get the local time using JS
  var date = new Date();
  var minute = date.getMinutes();
  var hour = date.getHours();

  // Create an object with each hand and it's angle in degrees
  var hands = [
    {
      hand: 'animicon-hour',
      angle: (hour * 30) + (minute / 2)
    },
    {
      hand: 'animicon-minute',
      angle: (minute * 6)
    }
  ];
  // Loop through each of these hands to set their angle
  for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll('.' + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
        elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
        elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
    }
  }
}

function weather(){
  $.ajax({
    url : "http://api.wunderground.com/api/4c85b3596d692c6a/conditions/q/NZ/Nelson.json",
  	dataType : "jsonp",
  	success : function(data) {
  		var temp_c = data.current_observation.temp_c,
      iconDay = '',
      iconNight = '';
  		switch(data.current_observation.icon){
  		  case 'clear':
  		  case 'sunny':
          iconNight = 'wi-night-clear';
          iconDay = 'wi-day-sunny';
          break;
        case 'partlycloudy':
        case 'partlysunny':
  		  case 'mostlysunny':
          iconDay = 'wi-day-sunny-overcast';
          iconNight = 'wi-night-alt-cloudy';
          break;
        case 'fog':
  		  case 'hazy':
          iconDay = 'wi-day-fog';
          iconNight = 'wi-night-fog';
  		    break;
  		  case 'cloudy':
  		  case 'mostlycloudy':
  		    iconDay = 'wi-cloudy';
          iconNight = 'wi-night-alt-cloudy';
  		    break;
  		  case 'rain':
          iconDay = 'wi-rain-mix';
          iconNight = 'wi-night-alt-rain-mix';
          break;
  		  case 'chancerain':
          iconDay = 'wi-showers';
          iconNight = 'wi-night-alt-showers';
  		    break;
  		  case 'tstorms':
          iconDay = 'wi-lightning';
          iconNight = 'wi-night-alt-lightning';
          break;
  		  case 'chancetstorms':
  		    iconDay = 'wi-storm-showers';
          iconNight = 'wi-night-alt-storm-showers';
  		    break;
  		  default:
  		    iconDay = 'wi-day-sunny';
          iconNight = 'wi-night-clear';
  		    break;
  		}
      $(".weather .weather-icon").html('<i class="wi ' + (new Date().getHours() > 18 ? iconNight : iconDay) + '"></i>');
    	$(".weather .temp").html(temp_c + "&deg;");
  	}
  });
}

function meetups(){
  var meetupURL = 'https://api.meetup.com/2/events?callback=?&key=207763705c19696342e3c3c74225425&sign=true&photo-host=public&group_urlname=bridgestreetcollective&page=2';
  var output = '',
  date = '';
  $.getJSON(meetupURL, function (data) {
    $.each(data.results, function (i,item) {
      date = moment(item.time).format('D MMMM');
      time = moment(item.time).format('h:mm');
      output += '<h4>' + item.name + '</h4><p>' + time + ' on ' + date.replace(' ','&nbsp;') + '</p>';
    });
    $(".meetups").html(output);
  });
}

function clock(){
  var currentTime = new Date();
  var currentHours = currentTime.getHours(),
    currentMinutes = currentTime.getMinutes();
  //currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
  //currentHours = ( currentHours === 0 ) ? 12 : currentHours;

  $('.time').html(currentHours + ":" + (( currentMinutes < 10 ? "0" : "" ) + currentMinutes));
  //$('.amPm').html(currentTime.getHours() < 12 ? "AM" : "PM");
}

function getTrack() {
  var lastFMURL = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=bridge_st&api_key=b69676d8cc6853bda7865b2080b494be&format=json";

  $.getJSON(lastFMURL, function (data) {
      if(data.recenttracks){
        var track = data.recenttracks.track[0].name;
        var artist = data.recenttracks.track[0].artist['#text'];
        $(".track").html(track);
        $(".artist").html(artist);
      }
    });
}

$(document).ready(function(){
  getTrack();
  setInterval(getTrack,5000);
  weather();
  setInterval(weather,900000);
  meetups();
  setInterval(meetups,300000);
  clock();
  setInterval(clock,1000);

  initLocalClock();

  $('.menu-columns').masonry({
    itemSelector: '.menu-item',
    columnWidth: '.menu-item'
  });
});
