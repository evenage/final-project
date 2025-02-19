// api.js

// Example for getting location data from Google Maps API
export async function fetchLocationData(query) {
  const apiKey = "2b80ed95c6453271928994bc6df0eee7"; // Replace with your actual Google Maps API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    const data = await response.json();
    return data.results; // Returns the results array with location details
  } catch (error) {
    console.error(error);
  }
}

// Example for getting weather data from OpenWeatherMap API
export async function fetchWeatherData(location) {
  const apiKey = "2b80ed95c6453271928994bc6df0eee7"; // Replace with your actual OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    return data; // Returns weather data
  } catch (error) {
    console.error(error);
  }
}
 