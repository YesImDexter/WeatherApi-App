const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const temperature = document.getElementById("temp");
const city = document.getElementById("city");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weathericon = document.getElementById("weather-icon")

const BtnPress = document.getElementById("btn-search");
const input = document.getElementById("input-city");

BtnPress.addEventListener("click", () => {
    if (input.value == null || input.value == '') {
        alert("Please Fill in A City");
    } else {
        checkWeather(input.value);
    }
});

async function checkWeather(cityVar) {
    const response = await fetch(apiUrl + `&appid=${apiKey}&q=${cityVar}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";

    } else {
        var data = await response.json();
        console.log(data);

        temperature.innerText = Math.round(data.main.temp) + " °c";
        city.innerText = data.name;
        humidity.innerText = data.main.humidity + " %";
        wind.innerText = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weathericon.src = "../resources/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weathericon.src = "../resources/clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            weathericon.src = "../resources/drizzles.png";
        } else if (data.weather[0].main == "Mist") {
            weathericon.src = "../resources/mist.png";
        } else if (data.weather[0].main == "Rain") {
            weathericon.src = "../resources/rain.png";
        } else if (data.weather[0].main == "Snow") {
            weathericon.src = "../resources/snow.png";
        } else {
            weathericon.src = "../resources/clear.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}