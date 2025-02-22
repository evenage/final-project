//my apis
//open weather
const openWeather_Key = "b85c0896ac0384183f68191ffd609882";
        
// OpenCage API Key
const  OpenCage_Api= '7ab437f6971c4fd2bd83f8330cc91aa6';


// DOM Elements
const locationElement = document.querySelector('.locationName');
const areaElem = document.querySelector('.areaName');

const map = L.map('map').setView([51.505, -0.09], 2); 
// Declare map marker
let currentMarker;

// Define coordinates variables
let currentLat = 0;
let currentLon = 0;

// OpenStreetMap 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//  update the map and weather
function getCurrentLocation() {
                
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 10);
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            currentMarker = L.marker([latitude, longitude]).addTo(map);

            // Update coordinates
            currentLat = position.coords.latitude;
            currentLon = position.coords.longitude;

            // console
            console.log('This is lat', currentLat);
            console.log('This is Lon', currentLon);
            
            // Show location name
            fetchLocationName(currentLat, currentLon);

            // Show location weather
            getWeatherByLatLon(currentLat, currentLon);

        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch the city name using OpenCage 
function fetchLocationName(lat, lon) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OpenCage_Api}`)
        .then(response => response.json())
        .then(data => {
        const city = data.results[0].components.city || data.results[0].components.county || data.results[0].components.state || "Unknown Location";
        city_split = city.split(" ")[0];

        // Show city name on console
        console.log('this is', city_split);
        
        // Show data on console
        console.log("Location name ", data);

        //Update element that shows the location name
        locationElement.innerText = city;

        })
        .catch(error => console.error('Error fetching location:', error));

}

// Fetch weather data by coordinates
function getWeatherByLatLon(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeather_Key}&units=metric`;


    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log("This weather info fetched by lat & lon", data);
            //display weather information
            displayUserWeather(data);
        })
        .catch(error => {
            alert('Error fetching weather data.');
        });
}

// Fetch weather data by city name
function getWeatherByCityName(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=3&appid=${openWeather_Key}&units=metric`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            // Display weather by cityName
            console.log("Weather by cityName: ", data);
            displaySearchedWeather(data);
        })
        .catch(error => {
            alert('Error fetching weather data.');
        });
}

// Display the user's weather data
function displayUserWeather(data) {
    console.log("Display weather: ", data);
    areaElem.innerHTML = data.name;
    userWeatherElem = document.getElementById("userWeatherInfo");
    userWeather = document.createElement("div");
    userWeather.classList.add("userLocation");
    userWeather.innerHTML = `
            <h3>Today's weather in ${data.name}! </h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
    `;

    //document.getElementById("userWeatherInfo"). innerHTML = data.main.temp;
    userWeatherElem.appendChild(userWeather);
}

// Initialize with the user's current location
getCurrentLocation()