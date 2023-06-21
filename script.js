const apiKey = '136aa9fb154ff278816cd983d640e043';

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`);
        const data = await response.json();
        console.log(data.weather[0].icon)
        return data;
    } catch (error) {
        console.log('Error:', error);
    }
}

function displayWeatherInfo(data) {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;

    const weatherIconHTML = `<i class="fas ${getWeatherIcon(icon)}" id="weatherIcon"></i>`;
    const temperatureHTML = `<p>Temperature: <span id="temperatureValue">${temperature}</span> °C</p>`;
    const descriptionHTML = `<p>Description: ${description}</p>`;
    const humidityHTML = `<p>Humidity: ${humidity}%</p>`;

    const weatherInfo = document.getElementById('weatherInfo');

    const weatherInfoHTML = `
    <div class="weather-content">
      ${weatherIconHTML}
      ${temperatureHTML}
      ${descriptionHTML}
      ${humidityHTML}
    </div>
  `;
  
      weatherInfo.innerHTML = weatherInfoHTML;
    updateBackgroundImage(icon);
}

function getWeatherIcon(icon) {
    const iconMap = {
        '01d': 'fa-sun',
        '01n': 'fa-moon',
        '02d': 'fa-cloud-sun',
        '02n': 'fa-cloud-moon',
        '03d': 'fa-cloud',
        '03n': 'fa-cloud',
        '04d': 'fa-cloud',
        '04n': 'fa-cloud',
        '09d': 'fa-cloud-showers-heavy',
        '09n': 'fa-cloud-showers-heavy',
        '10d': 'fa-cloud-rain',
        '10n': 'fa-cloud-rain',
        '11d': 'fa-bolt',
        '11n': 'fa-bolt',
        '13d': 'fa-snowflake',
        '13n': 'fa-snowflake',
        '50d': 'fa-smog',
        '50n': 'fa-smog'
    };

    return iconMap[icon] || 'fa-question'; 
}

function updateBackgroundImage(icon) {
    const body = document.body;
    const backgroundImageUrl = getBackgroundImageUrl(icon);

    if (backgroundImageUrl) {
        body.style.backgroundImage = `url(${backgroundImageUrl})`;
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundSize = 'cover';
    } else {
        body.style.backgroundImage = '';
        body.style.backgroundRepeat = '';
        body.style.backgroundSize = '';
    }
}

function getBackgroundImageUrl(icon) {
    const backgroundImageMap = {
        '01d': 'url(path/to/clear-sky-image.jpg)',
        '01n': 'url(path/to/clear-night-image.jpg)',
        '02d': 'url(path/to/partly-cloudy-image.jpg)',
        '02n': 'url(path/to/partly-cloudy-night-image.jpg)',
        '03d': 'url(path/to/cloudy-image.jpg)',
        '03n': 'url(path/to/cloudy-image.jpg)',
        '04d': 'url(path/to/cloudy-image.jpg)',
        '04n': 'url(path/to/cloudy-image.jpg)',
        '09d': 'url(path/to/rainy-image.jpg)',
        '09n': 'url(path/to/rainy-image.jpg)',
        '10d': 'url(path/to/rainy-image.jpg)',
        '10n': 'url(path/to/rainy-image.jpg)',
        '11d': 'url(path/to/thunderstorm-image.jpg)',
        '11n': 'url(path/to/thunderstorm-image.jpg)',
        '13d': 'url(path/to/snow-image.jpg)',
        '13n': 'url(path/to/snow-image.jpg)',
        '50d': 'url(path/to/mist-image.jpg)',
        '50n': 'url(path/to/mist-image.jpg)'
    };

    return backgroundImageMap[icon] || null;
}

const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherInfo = document.getElementById('weatherInfo');

getWeatherBtn.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location !== '') {
        getWeatherData(location)
            .then((data) => {
                displayWeatherInfo(data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
    }
});
