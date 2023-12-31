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


// weather based on user location
function userWeather(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    // callBack for weather
    var userGeoUrl =` https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

    var timestampDate = position.timestamp;
    var date = new Date(timestampDate);
    var userLocation = promt("Where are you currently located");
    cityName.innerText =userLocation.toUpperCase() + '' + '(' + date.toDateString() + ')';

    fetch(userGeoUrl, {
        method: 'get',
        credentials: 'same-origin',
        redirect: 'follow',
    })
    .then(function (response) {
        if (!response.ok) {
            alert('error: ' + response.statusText);
        } else {
            return response.json()
            .then(function (data) {
                renderWeather(data);
            });
        }
    })
    .catch(function (error) {
        alert(error)
    });
};

// Obtaining User location
function userLocation() {
    var good = (position) => {
        if(position) {
            userWeather(position);
        }
    };
    var bad = (error) => {
        if (error) {
            alert('Update settings to allow location or refresh the page.')
        }
    };

    var optionsCallback = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
 
    navigator.geolocation.getCurrentPosition(good, bad, optionsCallback);
}



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
                        renderWeather(data);
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
    humidity.textContent = 'Humidity: ' + data.current.humidity + ' %';
    wind.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';

        // 5 Day forecast
        const dates = document.querySelectorAll(".item-1");
        const icons = document.querySelectorAll(".item-2");
        const temps = document.querySelectorAll(".item-3");
        const winds = document.querySelectorAll(".item-4");
        const humidities = document.querySelectorAll(".item-5");

        // Loop the data 
        for (var i = 0; i < 5; i++) {
            var timestampDate = data.daily[i].dt;
            newDate = new Date( timestampDate * 1000);
            dates[i].innerHTML = newDateString();
            temps[i].innerHTML = "Temprature: " + data.daily[i].temp.day + "F";
            winds[i].innerHTML = "Wind-Speed: " + data.daily[i].wind_speed + "MPH";
            humidities[i].innerHTML = "Humiditiy: " + data.daily[i].humidity + "%";

            // Importing bootstrap sun and cloud icons dependent on current weather
            if (data.daily[i].clouds >= 36) {
                icons[i].innerHTML = "<i class=\"fa-solid fa-cloud-sun\" style=\"font-size:36px\"></i>"
            } else if (data.daily[i].rain >= 5) {
                icons[i].innerHTML = "<i class=\"fa-solid fa-cloud-showers-heavy\"></i>"
            } else if (data.daily[i].rain >= 3 && data.daily[i].rain < 5 && data.daily[i].clouds >= 36) {
                icons[i].innerHTML = "<i class=\"fa-solid fa-cloud-rain\"></i>"
            } else {
                icons[i].innerHTML = "<i class=\"fa-solid fa-sun\" style=\"font-size:36px\"></i>"
            }
        }
        // Save to storage
        array = [];
        var downloadedCities = document.querySelectorAll('.cities');
        downloadedCities.forEach((cities) => {
            // Check whether already downlaoded or not
            if(!array.includes(cities.textContent) && cities.textContent) {
                array.push(cities.textContent);
                }    
        });
        localStorage.setItem("downloadedCities", JSON.stringify(array));

};

// load downloaded cities
function getDownloadedCities() {
    array = JSON.parse(localStorage.getItem('downloadedCities')) || [];
    array.forEach((cityInput) => {
        cities.classList = "bg-transparent text-center cities m-3";
        cities.textContent = cityInput;
        citiesList.appendChild(cities);
        // Fetch data 
        cities.addEventListener("click", function(event) {
            citySearchInput.value = '';
            let target = event.targt;
            cityName.textContent = target.innerText;
            var URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + target.innerText + '&units=imperial&exclude=hourly,daily&appid=ce015676241c31c5df0ef2fb61768d00';
            fetch(URL, {
                cache: 'reload',
            })
            .then(function (response){
                if(!response.ok) {
                    alert("error: " + response.statusText);
                } else {
                    return response.json()
                    .then(function (latlon) {
                        getForecast();
                    })
                }
            })
            .catch(function (error) {
                alert(error);
            })
        });
    });

   
   


// Find search History
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
getDownloadedCities();
weatherGeo();

