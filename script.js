const apiKey = '49cc8c821cd2aff9af04c9f98c36eb74';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    fetch(`${apiUrl}weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            fetchForecast(city);
        })
        .catch(error => {
            alert('City not found or an error occurred!');
        });
}

function fetchForecast(city) {
    fetch(`${apiUrl}forecast?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        });
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    currentWeatherDiv.innerHTML = `
        <div class="weather-card">
            <div class="name">
                <h2>${data.name}</h2>
                <p>${new Date().toLocaleDateString()}</p>
            </div>
            <div class="temp">
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>${data.weather[0].description}</p>
                <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
            </div>  
        </div>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>';
    const forecastList = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    forecastList.forEach(day => {
        forecastDiv.innerHTML += `
            <div class="weather-card">
                <div class="data">
                <p>${new Date(day.dt_txt).toLocaleDateString()}</p>
                <p>Temperature: ${day.main.temp}°C</p>
                <p>${day.weather[0].description}</p>
                <img class="weather-icon" src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather icon">
                </div>
            </div>
        `;
    });
}

// Load default city weather on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather('New York');
});
