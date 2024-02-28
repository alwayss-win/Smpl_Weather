// Filename: /weather-app/src/index.js
const axios = require('axios');
const inquirer = require('inquirer');

async function getWeather(city) {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        return weatherData.weather[0].description;
    } catch (error) {
        throw new Error('Error fetching weather data. Please check the city name and API key.');
    }
}

async function main() {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'city',
                message: 'Enter the city name:',
            },
        ]);

        const city = answers.city;
        const weatherDescription = await getWeather(city);

        console.log(`Weather in ${city}: ${weatherDescription}`);
    } catch (error) {
        console.error(error.message);
    }
}

main();
