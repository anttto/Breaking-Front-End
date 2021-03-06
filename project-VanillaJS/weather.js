const weather = document.querySelector(".js-weather"); 

const API_KEY = '2d77db2e80d7eb0811d7e443ca736e18';
const COORDS = 'coords'; 

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperture = json.main.temp;
        const place = json.name;
        weather.innerText = `현재 기온 : ${temperture} ℃ \n ${place}`;
    });
}

function saveCoords(coordObj){
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude : latitude,
        longitude : longitude
    }
    saveCoords(coordObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');   
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}


function init(){
    loadCoords();
}

init();