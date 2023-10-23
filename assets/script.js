var apiKey = 'ce015676241c31c5df0ef2fb61768d00';
// Search & Clear Button
var searchButton = document.getElementById("search-button");
var clearButton = document.getElementById("clear-button");
// City Variables
var citiesList = document.getElementById("cities-list");
var citySearchInput = document.getElementById("city");
var cityName = document.getElementById("cities-name")
var citiesButtons = document.querySelectorAll(".cities");
// Array variable
var array = [];

// Weather Variables

// Temperature
var temp = document.getElementById('temp');
// Wind
var wind = document.getElementById("wind");
// humidity
var humidity = document.getElementById("humidity");








// Getting coordinates
function getCoordinates(){
    var cityName = citySearchInput.value.trim();

    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`

    fetch(geoUrl, {
        cache: 'reload',
    })   
        .then(function(response){
            if (!response.ok) {
                alert("error: " + response.statusText);
            }else {
                return response.json().then(function (latlon){
                    getForecast(latlon);
                });
            }
        })
        .catch(function (error) {
            alert(error)
        })   
}

// Functions
// Get weather using latlon | lat = latitude, lon = longitude;

function getForecast(latlon) {
    var lat =latlon.coord.lat
    var lon = latlon.coord.lon
       
        var forecastUrl = ` https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    
        fetch(forecastUrl, {
            method: 'get',
            credentials: 'same-origin',
            redirect: 'follow',
            cache: 'reload',
        })   
            .then(function(response){
                if (!response.ok) {
                    alert("Error: " + response.statusText);
                } else {
                    return response.json().then(function(data){
                        renderFiveDay(data);
                    })
                }
            })
            .catch(function (error){
                alert(error)
            })
}

function weatherGeo(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    // Callback for weather
    var newGeoUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    
    var timestampDate = position.timestamp;
    var date = new Date(timestampDate);
    var activeUserLocation = prompt("Where are you currently located?");
    cityName.innerText = activeUserLocation.toUpperCase() +'' + '(' + date.toDateString() + ')';

    // fet newGEOURL
    fetch(newGeoUrl, {
        method: 'get',
        credentials: 'same-origin',
        redirect: 'follow',
    })
    .then(function (response) {
        if (!response.ok) {
            alert("error: " + response.statusText);
        } else {
            return response.json().then(function(data) {
                renderWeather();
            });
        }
    })
    .catch(function (error) {
        alert(error)
    });

}

function renderWeather(data) {
    var cities = document.createElement("button");
    cities.classList = "bg-transparent text-center cities m-3";
    cities.textContent = citySearchInput.value.toUpperCase();
    // Iff statement: If city has alreadfy exists
    if(!array.includes(cities.textContent)) {
        citiesList.appendChild(cities);
    }
    cities.addEventListener("click", function(event) {
        citySearchInput.value = '';
        let target = event.target;
        cityName.textContent = target.innerText;

        // URL =
        const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + target.innerText + '&units=imperial&exclude=hourly,daily&appid=ce015676241c31c5df0ef2fb61768d00';

        fetch(URL, {
            cache: 'reload',
        })
        .then(function (response) {
            if (!response.ok) {
                alert("error: " + response.statusText);
            } else {
                return response.json().then(function (latlon) {
                    getForecast(latlon);
                })
            }
        })
        .catch(function (error) {
            alert(error);
        })
    });
    // Make date readable
    var timestampDate = data.current.dt;
    var date = new Date(timestampDate * 1000);

    // Put data on page
    if (citySearchInput.value) {
        cityName.textContent = citySearchInput.value.toUpperCase() + '(' + date.toDateString() + ')';
    }
    temp.textContent = 'Temperature: ' + data.current.temp + 'F';
}
// function todayForecast() {
//         var card = document.createElement('div');
//         var cityName = document.createElement('h1');
//         var temp = document.createElement('p');  
//         var wind = document.createElement('p');  
//         var humidity = document.createElement('p'); 
        
//         cityName.textContent = forecast.city.name;
//         temp.textContent = `Temp: ${forecast.list[i].main.temp} °F`;
//         wind.textContent = `Wind: ${forecast.list[i].wind.speed} MPH`;
//         humidity.textContent = `Humidity: ${forecast.list[i].main.humidity} %`;

//         card.append(cityName,temp,wind,humidity)
//         document.querySelector('.current-weather').append(card);

// }

// function renderFiveDay(forecast) {
    
//     for (let i = 0; i < forecast.list.length; i += 8) {
//         var card = document.createElement('div');
//         var cityName = document.createElement('h2');
//         var temp = document.createElement('p');  
//         var wind = document.createElement('p');  
//         var humidity = document.createElement('p');  

//         cityName.textContent = forecast.city.name;
//         temp.textContent = `Temp: ${forecast.list[i].main.temp} °F`;
//         wind.textContent = `Wind: ${forecast.list[i].wind.speed} MPH`;
//         humidity.textContent = `Humidity: ${forecast.list[i].main.humidity} %`;

//         card.setAttribute('style', 'margin:10px; background-color: white; padding: 10px;')

//         card.append(cityName,temp,wind,humidity)
//         document.querySelector('.forecast').append(card);

//         // Display For Upper Dashboard
//         var temp1 = document.querySelector('#temp')
//         var wind1 = document.querySelector('#wind')
//         var humidity1 = document.querySelector('#humidity')
//         temp1.textContent = `Temp: ${forecast.list[i].main.temp} °F`;
//         wind1.textContent = `Wind: ${forecast.list[i].wind.speed} MPH`;
//         humidity1.textContent = `Humidity: ${forecast.list[i].main.humidity} %`;


//     }
// }

// function searchHistory() {
//     var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
//     var cityName = document.querySelector('#city').value
//     if (!searchHistory.includes(cityName)) {
//         searchHistory.push(cityName)
//         localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
//         renderSearchHistory();
//     }
   
   



function renderSearchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    if (!searchHistory.length === 0) {
        document.querySelector('.searched-cities').innerHTML = '';
        for (let i = 0; i < searchHistory.length - 1; i++) {
            var cityButton = document.createElement('button');
            cityButton.textContent = searchHistory[i];
    
            document.querySelector('.searched-cities').append(cityButton);  
        };
        return;
    }
    console.log('No local storage');
    var cityButton = document.createElement('button');
    cityButton.textContent = document.querySelector('#city').value;
    document.querySelector('.searched-cities').append(cityButton);  
}

function clearRecentlyViewed() {
    localStorage.clear();
    citiesList.innerHTML = '';
};

clearButton.addEventListener("click", function() {
    clearRecentlyViewed();
});

searchButton.addEventListener("click", getCoordinates);

// As soon as page opens:


