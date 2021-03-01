//declare variables
let apiKey = 'e488a40323177664f2fc7533181baeb8'
let historyEl = document.querySelector('#search-history');
let currentEl = document.querySelector('#current-weather');
let forecastEl = document.querySelector('#forecast');
let searchInput = document.querySelector('input');
let searchBtn = document.querySelector('button');

//search click event
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    let userCity = searchInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => console.log(data))
    console.log(userCity)
});


