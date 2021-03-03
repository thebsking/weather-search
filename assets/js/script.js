//declare variables
let apiKey = 'e488a40323177664f2fc7533181baeb8'
let historyEl = document.querySelector('#search-history');
let currentEl = document.querySelector('#current-weather');
let forecastEl = document.querySelector('#forecast');
let searchInput = document.querySelector('input');
let searchBtn = document.querySelector('button');
let currentResults;
let secondCurrent;

function displayResults() {
    //create elements for results
    let cityName = document.createElement('h2');
    cityName.textContent = currentResults.name;
    let temp = document.createElement('p');
    temp.textContent = 'Temperature: ' + Math.floor(currentResults.main.temp) + 'ºF';
    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + currentResults.main.humidity + '%';
    let wind = document.createElement('p');
    wind.textContent = 'Wind Speed: ' + currentResults.wind.speed + 'MPH';
    

    //append results to page
    currentEl.appendChild(cityName);
    currentEl.appendChild(temp);
    currentEl.appendChild(humidity);
}

function secondCall(lati, long){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=`+lati+`&lon=`+long+`&exclude=minutely,hourly,alerts&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            secondCurrent = data
            let uvIndex = document.createElement('span');
            uvIndex.textContent = secondCurrent.current.uvi;
            currentEl.appendChild(uvIndex).classList.add('uv-index')
            console.log(data);
        })
}

//search click event
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    let userCity = searchInput.value;
    
    //add search to history list
    let historyItem = document.createElement('button')
    historyItem.textContent = userCity
    historyItem.classList.add('historyBtn')
    historyEl.appendChild(historyItem)
    
    //fetch weather data
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            currentResults = data;
            console.log(data);
            secondCall(currentResults.coord.lat, currentResults.coord.lon);
            displayResults();  

        })
    console.log(userCity)
    
});


