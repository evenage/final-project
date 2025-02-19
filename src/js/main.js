let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

document.getElementById("createEventBtn").addEventListener("click", function() {
  const eventName = document.getElementById("eventName").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventLocation = document.getElementById("eventLocation").value;
  const event = { eventName, eventDate, eventLocation };
  localStorage.setItem('event', JSON.stringify(event));
  alert("Event Created Successfully!");
  displayEvent();
});

  // Get location data from Google Maps API
  const locationData = await fetchLocationData(eventLocation);
  const locationElement = document.getElementById("locationData");
  locationElement.innerHTML = `
    <h2>Location Data</h2>
    <p>Latitude: ${locationData[0].geometry.location.lat}</p>
    <p>Longitude: ${locationData[0].geometry.location.lng}</p>

  `;
  // Get weather data from OpenWeatherMap API
  const weatherData = await fetchWeatherData(eventLocation);
  const weatherElement = document.getElementById("weatherData");
  weatherElement.innerHTML = `
    <h2>Weather Data</h2>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
  `;

  // Save event data to local storage
  localStorage.setItem('event', JSON.stringify(event));

  // Display event data
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = `
    <h2>Upcoming Event</h2>
    <p>Name: ${event.eventName}</p>
    <p>Date: ${event.eventDate}</p>
    <p>Location: ${event.eventLocation}</p>
  `;

  alert("Event Created Successfully!");




