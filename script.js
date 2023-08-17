const weatherApiKey = '6132e6a2f1b2950224a527f53ff76bef';
const giphyApiKey = 'g36JrH90YQ4YjapkSg0TdxU1BinSsdQE';
let city = 'Barrie,CA'; // Default city

document.addEventListener('DOMContentLoaded', function () {
    const weatherDataElement = document.getElementById('weatherData');
    const gifElement = document.getElementById('gif');

    async function getWeatherData() {
        try {
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;
            const weatherResponse = await fetch(weatherApiUrl);
            const weatherData = await weatherResponse.json();

            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            weatherDataElement.innerHTML = `
                <p>City: ${weatherData.name}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Weather: ${weatherDescription}</p>
            `;

            const gifTag = temperature < 20 ? 'cold' : 'warm';

            const giphyApiUrl = `https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}&tag=${gifTag}`;
            const giphyResponse = await fetch(giphyApiUrl);
            const giphyData = await giphyResponse.json();
            const gifUrl = giphyData.data.images.original.url;

            gifElement.innerHTML = `<img src="${gifUrl}" alt="Weather GIF">`;
        } catch (error) {
            console.error('Error fetching data:', error);
            weatherDataElement.textContent = 'An error occurred while fetching data.';
        }
    }

    async function updateWeatherAndGif() {
        const newCity = document.getElementById('cityInput').value;

        if (newCity) {
            city = newCity;
            getWeatherData();
        }
    }

    const changeCityBtn = document.getElementById('changeCityBtn');
    changeCityBtn.addEventListener('click', updateWeatherAndGif);

    getWeatherData();
});
