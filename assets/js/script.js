//declare variables
let key = 'e488a40323177664f2fc7533181baeb8'
let historyEl = document.querySelector('#search-history');
let currentEl = document.querySelector('#current-weather');
let forecastEl = document.querySelector('#forecast');
let searchInput = document.querySelector('input');
let searchBtn = document.querySelector('button');
let today = moment().format('MM/DD/yyyy');
let index = 0;
let userCity;
let firstData;
let secondData;

function firstApiCall() {
    userCity = searchInput.value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${key}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            firstData = data;
            secondApiCall(firstData.coord.lat, firstData.coord.lon);
        })
};

function secondApiCall(lati, long){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&exclude=minutely,hourly,alerts&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            secondData = data;
            console.log(secondData)
        })
    showData();
}

function showData() {
    let showCity = document.createElement('h2');
    showCity.textContent = firstData.name + ' (' + today + ')';
    currentEl.appendChild(showCity)
}

//search click event
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    currentEl.innerHTML = ''
    firstApiCall();
    
    //add search to history list
    let historyItem = document.createElement('button')
    historyItem.textContent = userCity
    historyItem.classList.add('historyBtn')
    historyItem.setAttribute('id', `item-${index}`)
    index++;
    historyEl.appendChild(historyItem);
    window.localStorage.setItem(historyItem.getAttribute('id'), userCity)
    searchInput.value = '';
})

//display search history on reload
if (window.localStorage.length > 0) {
    for(var i = 0; i < window.localStorage.length; i++) {
        let showCity = window.localStorage.getItem(`item-${i}`)
        let historyItem = document.createElement('button')
        historyItem.textContent = showCity
        historyItem.classList.add('historyBtn')
        historyItem.setAttribute('id', `item-${i}`)
        historyEl.appendChild(historyItem);
    }
}