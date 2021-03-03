//declare variables
let apiKey = 'e488a40323177664f2fc7533181baeb8'
let historyEl = document.querySelector('#search-history');
let currentEl = document.querySelector('#current-weather');
let forecastEl = document.querySelector('#forecast');
let searchInput = document.querySelector('input');
let searchBtn = document.querySelector('button');
let currentResults;

function displayResults() {
    //create elements for results
    let cityName = document.createElement('h2');
    cityName.textContent = currentResults.name;
    let temp = document.createElement('span');
    temp.textContent = 'Temperature: ' + Math.floor(currentResults.main.temp) + 'ºF';
    let humidity = document.createElement('span');
    humidity.textContent = 'Humidity: ' + currentResults.main.humidity + '%';

    //append results to page
    currentEl.appendChild(cityName);
    currentEl.appendChild(temp);
    currentEl.appendChild(humidity);
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
            displayResults();  

        })
    console.log(userCity)
    
});


