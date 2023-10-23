var apiKey = 'ce015676241c31c5df0ef2fb61768d00';



var date 
date = document.querySelector('#currentday')
date.textContent = dayjs().format('dddd, MMMM D')
var currentHour = dayjs().hour()







function getCoordinates(){
    var cityName = document.querySelector('#city').value
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`

    fetch(geoUrl)   
        .then(function(response){
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            var {lat,lon} = data[0];
            getForecast(lat,lon);
        })
        var displayCity
        displayCity = document.querySelector('#cityName')
        displayCity.textContent = cityName
}

function getForecast(lat,lon) {
       
        var forecastUrl = ` https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
    
        fetch(forecastUrl)   
            .then(function(response){
                return response.json()
            })
            .then(function(data) {
                console.log('Forecast', data);
                renderFiveDay(data);
            })
           

}
function todayForecast() {
        var card = document.createElement('div');
        var cityName = document.createElement('h1');
        var temp = document.createElement('p');  
        var wind = document.createElement('p');  
        var humidity = document.createElement('p'); 
        
        cityName.textContent = forecast.city.name;
        temp.textContent = `Temp: ${forecast.list[i].main.temp} °F`;
        wind.textContent = `Wind: ${forecast.list[i].wind.speed} MPH`;
        humidity.textContent = `Humidity: ${forecast.list[i].main.humidity} %`;

        card.append(cityName,temp,wind,humidity)
        document.querySelector('.current-weather').append(card);

}

function renderFiveDay(forecast) {
    
    for (let i = 0; i < forecast.list.length; i += 8) {
        var card = document.createElement('div');
        var cityName = document.createElement('h2');
        var temp = document.createElement('p');  
        var wind = document.createElement('p');  
        var humidity = document.createElement('p');  

        cityName.textContent = forecast.city.name;
        temp.textContent = `Temp: ${forecast.list[i].main.temp} °F`;
        wind.textContent = `Wind: ${forecast.list[i].wind.speed} MPH`;
        humidity.textContent = `Humidity: ${forecast.list[i].main.humidity} %`;

        card.setAttribute('style', 'margin:10px; background-color: white; padding: 10px;')

        card.append(cityName,temp,wind,humidity)
        document.querySelector('.forecast').append(card);

        // Display For Upper Dashboard
        var temp1 = document.querySelector('#temp')
        var wind1 = document.querySelector('#wind')
        var humidity1 = document.querySelector('#humidity')
        temp1.textContent = `Temp: ${forecast.list[i].main.temp} °F`;
        wind1.textContent = `Wind: ${forecast.list[i].wind.speed} MPH`;
        humidity1.textContent = `Humidity: ${forecast.list[i].main.humidity} %`;


    }
}

function searchHistory() {
    var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
    var cityName = document.querySelector('#city').value
    if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        renderSearchHistory();
    }
   
   
}

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

document.querySelector('#search-button').addEventListener('click', function(){
    console.log('click search button')
    getCoordinates();
    searchHistory();
    todayForecast();
    renderSearchHistory();
})

