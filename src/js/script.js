const cityName = document.getElementById('cityInfo');
const countryName = document.getElementById('countryInfo');
const mainTemp = document.getElementById('mainTemp');
const mainWeather = document.getElementById('primaryWeather');
const maxTemp = document.getElementById('tempMax');
const minTemp = document.getElementById('tempMin');
const geoWindSpeed = document.getElementById('miscWindSpeed');
const geoWindDirection = document.getElementById('miscWindDirection');
const geoHumid = document.getElementById('miscHumid');
const tempFeel = document.getElementById('feelTemp');
//calling all information
const inputValue = document.getElementById('locationText');

const sliderValue = document.getElementById('checkBox');
let locationIcon = document.querySelector('.weather-icon');

//keeping fahrenheit and celsius of all temperatures

let mainTempF = null;
let maxTempF = null;
let minTempF = null;
let tempFeelF = null;

let mainTempC = null;
let maxTempC = null;
let minTempC = null;
let tempFeelC = null;

//controls the temperature change
sliderValue.addEventListener("click",function(){
    if(sliderValue.checked){
        mainTemp.innerHTML = `${mainTempC}&#176C`;
        maxTemp.innerHTML= `Max temperature: ${maxTempC}&#176C`;
        minTemp.innerHTML = `Min Temperature: ${minTempC}&#176C`;
        tempFeel.innerHTML = `Feels Like: ${tempFeelC}&#176C`;
    }
    else{
        mainTemp.innerHTML = `${mainTempF}&#176F`; 
        maxTemp.innerHTML= `Max temperature: ${maxTempF}&#176F`;
        minTemp.innerHTML = `Min Temperature: ${minTempF}&#176F`;
        tempFeel.innerHTML = `Feels Like: ${tempFeelF}&#176F`;
    }    
});



returnAPI('Seoul');

// sliderValue.addEventListener("click",changeAllTemp(sliderValue.checked) );




function returnTemp(boolean, temperature){
    if(boolean){
        const number = Math.ceil(temperature - 273.15);
        return number;
    }
    else{
        const number = Math.ceil(9/5 * (temperature - 273) + 32);
        return number;
    }
}


async function returnAPI(input){
    try {

        const geoCode = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=0a4cbe0e083fb5050695ba6fafccdaab`);
        const geoData = await geoCode.json();

        let latty = geoData[0].lat;
        let longy = geoData[0].lon;
        let country = geoData[0].country;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latty}&lon=${longy}&appid=0a4cbe0e083fb5050695ba6fafccdaab`);
        const weatherData = await response.json();
        // console.log(weatherData);
        let primWeather= weatherData.weather[0].description;
        let windSpeed = weatherData.wind.speed;
        let windDirection = weatherData.wind.deg;
        let humidity = weatherData.main.humidity;
        let weatherIcon = weatherData.weather[0].icon;
        var weatherIconUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        locationIcon.innerHTML = `<img src=${weatherIconUrl}>`;




        mainTempF = returnTemp(false, weatherData.main.temp_min);
        maxTempF = returnTemp(false,weatherData.main.temp_max);
        minTempF = returnTemp(false,weatherData.main.temp); 
        tempFeelF = returnTemp(false,weatherData.main.feels_like);
        
        mainTempC = returnTemp(true, weatherData.main.temp_min);
        maxTempC = returnTemp(true,weatherData.main.temp_max);
        minTempC = returnTemp(true,weatherData.main.temp); 
        tempFeelC = returnTemp(true,weatherData.main.feels_like);


        //testing in html
        
        cityName.innerHTML = weatherData.name;
        countryName.innerHTML = country;
        
        mainWeather.innerHTML = primWeather;
        // maxTemp.innerHTML = `Max temp: ${currentMaximumTemperature}`;
        // minTemp.innerHTML = `Min temp: ${currentMinimumTemperature}`;
        // tempFeel.innerHTML = `Feels like: ${currentFeelTemp}`;
        if(sliderValue.checked){
            mainTemp.innerHTML = `${mainTempC}&#176C`;
            maxTemp.innerHTML= `Max temperature: ${maxTempC}&#176C`;
            minTemp.innerHTML = `Min Temperature: ${minTempC}&#176C`;
            tempFeel.innerHTML = `Feels Like: ${tempFeelC}&#176C`;
        }
        else{
            mainTemp.innerHTML =   `${mainTempF}&#176F`; 
            maxTemp.innerHTML= `Max temperature: ${maxTempF}&#176F`;
            minTemp.innerHTML = `Min Temperature: ${minTempF}&#176F`;
            tempFeel.innerHTML = `Feels Like: ${tempFeelF}&#176F`;
        }

        geoWindDirection.innerHTML = `Wind direction: ${windDirection}`; 
        geoWindSpeed.innerHTML = `Wind Speed: ${windSpeed} m/s`;
        geoHumid.innerHTML = `Humidity: ${humidity} %`;

    } catch (error) {
        console.log(error);
    }

}
async function returnForecast(input){
    try{
        const forecastGeoCode = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=0a4cbe0e083fb5050695ba6fafccdaab`);
        const forecastData = await forecastGeoCode.json();
        console.log(forecastData.list);
        // forecastData.list.map((item) => {
        //     console.log(item);
        // })
        console.log("Success");
    }
    catch(error){
        console.log(error);
    }
}


function showValues() 
{
    returnAPI(inputValue.value);
    returnForecast(inputValue.value);
}

