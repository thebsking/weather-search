//declare variables
let key = 'e488a40323177664f2fc7533181baeb8'
let historyEl = document.querySelector('#search-history');
let currentEl = document.querySelector('#current-weather');
let forecastEl = document.querySelector('#forecast');
let searchInput = document.querySelector('input');
let searchBtn = document.querySelector('button');
let today = moment().format('MM/DD/yyyy');
let index = 0;
let firstData;
let secondData;

function firstApiCall(city) {
    city = searchInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            firstData = data;
            secondApiCall(firstData.coord.lat, firstData.coord.lon);
        })
};

function secondApiCall(lati, long){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&exclude=minutely,hourly,alerts&appid=${key}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            secondData = data;
            console.log(secondData)
            showCurrent();
        })
    
}
//render current weather conditions
function showCurrent() {
    currentEl.setAttribute('style', 'background-color:rgba(255,253,250,0.7)')
    showCity = document.createElement('h2');
    showCity.textContent = firstData.name + ' (' + today + ') ' 
    currentEl.appendChild(showCity)

    showTemp = document.createElement('h3')
    showTemp.textContent = 'Temperature: ' + Math.floor(firstData.main.temp) + 'ºF';
    currentEl.appendChild(showTemp)
    let iconCode = firstData.weather[0].icon
    let iconDisplay = document.createElement('img')
    iconDisplay.classList.add('weather-image')
    iconDisplay.setAttribute('src', `https://openweathermap.org/img/w/${iconCode}.png`)
    currentEl.append(iconDisplay)

    showHumid = document.createElement('p');
    showHumid.textContent = `Humidity: ${firstData.main.humidity}%`;
    currentEl.appendChild(showHumid)

    showWind = document.createElement('p');
    showWind.textContent = `Wind Speed: ${firstData.wind.speed} MPH`
    currentEl.appendChild(showWind);

    showUvi = document.createElement('p');
    showUvi.textContent = 'UV Index: '
    currentEl.appendChild(showUvi)
    uvIndex = document.createElement('span')
    uvIndex.classList.add('index-num')
    uvIndex.textContent = secondData.current.uvi
    showUvi.appendChild(uvIndex)

    //if function to change uv index color
    let indexCheck = document.querySelector('.index-num');
    if (indexCheck.textContent < 3) {
        indexCheck.setAttribute('style', 'background-color:green;color:white')
    } else if (indexCheck.textContent <= 6)  {
        indexCheck.setAttribute('style', 'background-color:orange')
    } else {
        indexCheck.setAttribute('style', 'background-color:red')
    }

    
    showFuture()
}
 //render forecast conditions
 function showFuture() {
    let forecastTitle = document.createElement('h2')
    forecastTitle.textContent = '5-Day Forecast'
    forecastEl.appendChild(forecastTitle)
    forecastTitle.setAttribute('style', 'width:100%')
    forecastTitle.classList.add('text-white')
    for(var i = 1; i < 6; i++){
        let futureDay = secondData.daily[i];
        newDay = moment().add(i, 'days') ;
        let futureCard = document.createElement('div')
        futureCard.setAttribute('id', `day-${i}`)
        futureCard.classList.add('card', 'forecast-card')
        forecastEl.appendChild(futureCard)
        let futureDate = document.createElement('h5')
        futureDate.textContent = newDay.format('MM/DD/yyyy');
        futureCard.appendChild(futureDate)

        let iconCode = futureDay.weather[0].icon;
        let iconDisplay = document.createElement('img')
        iconDisplay.setAttribute('src', `https://openweathermap.org/img/w/${iconCode}.png`)
        iconDisplay.classList.add('weather-image')
        futureCard.append(iconDisplay)
    

        let futureTemp = document.createElement('p')
        futureTemp.textContent = `Temperature: ${futureDay.temp.day}ºF`
        let futureHumid = document.createElement('p')
        futureHumid.textContent = `Humidity: ${futureDay.humidity}%`
        futureCard.appendChild(futureTemp)
        futureCard.appendChild(futureHumid)

}}

//search click event
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    currentEl.innerHTML = ''
    forecastEl.innerHTML = ''
    firstApiCall();
    
    //add search to history list
    let historyItem = document.createElement('button')
    historyItem.textContent = searchInput.value
    historyItem.classList.add('historyBtn')
    historyItem.setAttribute('id', `item-${index}`)
    index++;
    historyEl.appendChild(historyItem);
    window.localStorage.setItem(historyItem.getAttribute('id'), searchInput.value)
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

//click event for history items
historyEl.addEventListener('click', function(event){
    searchInput.value = event.target.textContent
    currentEl.innerHTML = ''
    forecastEl.innerHTML = ''
    firstApiCall()
    searchInput.value = ''
})

