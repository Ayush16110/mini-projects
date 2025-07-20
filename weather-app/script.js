document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "Enter_your_api_key"; // env variable

    getWeatherBtn.addEventListener("click", async () => {
        const city = cityInput.value.trim();
        if (city === "") return;

        // it may throw some error
        // server/database is always in another continent

        try {
            const data = await fetchWeatherData(city);
            displayWeatherData(data);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.json();
        return data;
    }

    function displayWeatherData(data) {

        const {name, main, weather} = data;
        cityName.innerText = name;

        temperature.innerText = `Temperature: ${main.temp}°C`
        description.innerText = `Weather Condition: ${weather[0].description}`

        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

    function showError() {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.remove("hidden");
    }
});
