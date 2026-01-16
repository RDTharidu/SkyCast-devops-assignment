
const apiKey = "088410c5d5d2e6d6b34af6ad104e483b"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const locationBtn = document.querySelector("#location-btn");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
    try {
        constresponse = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            var data = await response.json();

            
            document.querySelector(".city").innerText = data.name;
            document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerText = data.main.humidity + "%";
            document.querySelector(".wind").innerText = data.wind.speed + " km/h";

            
            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


if (searchBtn) {
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
}


if (locationBtn) {
    locationBtn.addEventListener("click", getUserCoordinates);
}


window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserCoordinates, (err) => {
            console.log("User denied location or error occurred.");
        });
    }
});

function getUserCoordinates(position) {
   
    let lat, lon;
    
   
    if(position.coords) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    } else {
       
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                lat = pos.coords.latitude;
                lon = pos.coords.longitude;
                fetchLocationWeather(lat, lon);
            }, () => alert("Location access denied."));
            return;
        }
    }
    
    fetchLocationWeather(lat, lon);
}

function fetchLocationWeather(lat, lon) {
    const REVERSE_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(REVERSE_API_URL)
        .then((res) => res.json())
        .then((data) => {
           
            document.querySelector(".city").innerText = data.name;
            document.querySelector(".temp").innerText = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerText = data.main.humidity + "%";
            document.querySelector(".wind").innerText = data.wind.speed + " km/h";

           
            if (data.weather[0].main == "Clouds") weatherIcon.src = "images/clouds.png";
            else if (data.weather[0].main == "Clear") weatherIcon.src = "images/clear.png";
            else if (data.weather[0].main == "Rain") weatherIcon.src = "images/rain.png";
            else if (data.weather[0].main == "Drizzle") weatherIcon.src = "images/drizzle.png";
            else if (data.weather[0].main == "Mist") weatherIcon.src = "images/mist.png";

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        })
        .catch(() => {
            alert("Something went wrong with getting location weather!");
        });
}