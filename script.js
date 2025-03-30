document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'bcafac5ed308a61fcf6f8f5298d1dfdf';
    const weatherInfo = document.getElementById('weather-info');
    const searchBtn = document.getElementById('search-btn');
    const locationInput = document.getElementById('location-input');
    const locationBtn = document.getElementById('location-btn');

   

    async function fetchWeatherByCity(city) {
        weatherInfo.innerHTML = `<div class="loading-animation">
            <div class="pulse"><i class="wi wi-day-cloudy"></i></div>
            <p>Loading weather...</p>
        </div>`;
        
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            
            if (data.cod === 200) {
                // Add fade-in animation when displaying weather
                setTimeout(() => {
                    displayWeather(data);
                    updateBackground(data.weather[0].main);
                }, 300);
            } else {
                showError('City not found. Please try again.');
            }
        } catch (error) {
            showError('Failed to fetch weather data. Please try again.');
        }
    }

    async function fetchWeatherByCoords(lat, lon) {
        weatherInfo.innerHTML = `<div class="loading-animation">
            <div class="pulse"><i class="wi wi-day-sunny"></i></div>
            <p>Detecting location...</p>
        </div>`;
        
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            
            if (data.cod === 200) {
                setTimeout(() => {
                    displayWeather(data);
                    updateBackground(data.weather[0].main);
                }, 300);
            } else {
                showError('Failed to fetch weather data.');
            }
        } catch (error) {
            showError('Failed to fetch weather data. Please try again.');
        }
    }

    function displayWeather(data) {
        const weatherHtml = `
            <div class="weather-card slide-up">
                <h2 class="fade-in">${data.name}, ${data.sys.country}</h2>
                <div class="weather-info">
                    <i class="wi ${getWeatherIcon(data.weather[0].main)} weather-icon pulse"></i>
                    <p class="fade-in">${data.weather[0].description}</p>
                </div>
                <div class="weather-details">
                    <p class="fade-in">🌡️ Temperature: ${data.main.temp}°C</p>
                    <p class="fade-in">💧 Humidity: ${data.main.humidity}%</p>
                    <p class="fade-in">🌬️ Wind Speed: ${data.wind.speed} m/s</p>
                </div>
            </div>
        `;
        weatherInfo.innerHTML = weatherHtml;
    }

    function showError(message) {
        weatherInfo.innerHTML = `
            <div class="error-message slide-up">
                <i class="wi wi-alien"></i>
                <p>${message}</p>
            </div>
        `;
    }

    function updateBackground(condition) {
        const body = document.body;
        body.style.transition = 'background-image 0.8s ease-in-out, background-color 0.8s ease-in-out';
        
        // Background settings remain the same
        let backgroundImage = '';
        let fallbackColor = '#87CEEB';

        switch (condition) {
            case 'Clear':
                backgroundImage = 'https://images.unsplash.com/photo-1517935722491-3f9dd8454332?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
                fallbackColor = '#87CEEB';
                break;
            case 'Clouds':
                backgroundImage = 'https://images.unsplash.com/photo-1514517604298-c96b80f08506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
                fallbackColor = '#D3D3D3';
                break;
            case 'Rain':
                backgroundImage = 'https://images.unsplash.com/photo-1506744002641-6e22cf29dd28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
                fallbackColor = '#A9A9A9';
                break;
            case 'Snow':
                backgroundImage = 'https://images.unsplash.com/photo-1488894764149-5f259a421619?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
                fallbackColor = '#E6E6FA';
                break;
            case 'Thunderstorm':
                backgroundImage = 'https://images.unsplash.com/photo-1592861956120-e524fc6bd159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
                fallbackColor = '#2F4F4F';
                break;
            default:
                backgroundImage = 'https://images.unsplash.com/photo-1441974231531-c6227dbef7eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80';
                fallbackColor = '#87CEEB';
                break;
        }

        body.style.backgroundColor = fallbackColor;
        body.style.backgroundImage = `url(${backgroundImage})`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundPosition = 'center';
        
        const img = new Image();
        img.onerror = () => {
            body.style.backgroundImage = '';
        };
        img.src = backgroundImage;
    }

    function getWeatherIcon(condition) {
        switch (condition) {
            case 'Clear': return 'wi-day-sunny';
            case 'Clouds': return 'wi-cloudy';
            case 'Rain': return 'wi-rain';
            case 'Snow': return 'wi-snow';
            case 'Thunderstorm': return 'wi-thunderstorm';
            default: return 'wi-day-sunny';
        }
    }

    // Add animation to buttons
    searchBtn.addEventListener('click', () => {
        searchBtn.classList.add('clicked');
        setTimeout(() => searchBtn.classList.remove('clicked'), 200);
        
        const city = locationInput.value.trim();
        if (city) {
            fetchWeatherByCity(city);
        } else {
            showError('Please enter a city name');
        }
    });

    locationBtn.addEventListener('click', () => {
        locationBtn.classList.add('clicked');
        setTimeout(() => locationBtn.classList.remove('clicked'), 200);
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    showError('Location access denied. Please search by city name.');
                }
            );
        } else {
            showError('Geolocation is not supported by your browser.');
        }
    });
});