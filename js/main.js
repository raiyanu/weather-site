import Weather from "./weather.js";
import recommendPic from "./pic_recommend.js";
const weather = new Weather();

function setLoading(toTurnOn) {
    toTurnOn ? document.getElementById('loader').classList.add("show") : setTimeout(() => {
        document.getElementById('loader').classList.remove("show")
    }, 1000);
}

function showToast(message = "an error occured") {
    let helper_toast = document.getElementById('helper-toast');
    helper_toast.classList.add("show");
    helper_toast.innerHTML = message;
    setTimeout(() => {
        helper_toast.classList.remove("show");
        helper_toast.innerHTML = ""
    }, 5000);
}



export async function getWeather(location) {
    let suggestedCity = await weather.getCitySuggestion(location);
    if (suggestedCity.length <= 0) {
        showToast(`<b>${location}</b>&nbsp; doesn't exist in our database`);
        return;
    }

    setLoading(true);
    console.log("event : ", location);
    if (location == "") {
        showToast("Please, Enter your desired city name");
        setLoading(false);
        return;
    }

    let weatherInfo;
    setLoading(true);

    try {
        weatherInfo = await weather.fetchWeather(location);
    } catch (error) {
        showToast("<em>Internal server Error </em>, try again later");
        setLoading(false);
    }
    if (!(weatherInfo.current && weatherInfo.location)) {
        // TODO: ...
        showToast("<em>Internal Error</em>");
        setLoading(false);
        return;
    }
    console.log(weatherInfo);

    updateUi(weatherInfo)
    document.getElementById('location_suggestions').innerHTML = '';
    setLoading(false);
}

async function getUpdatedWeatherInfo(location) {
    let weatherInfo = await weather.fetchWeather(location);
    updateUi(weatherInfo)
}

async function updateUiBasedByUserLocation() {
    let weatherInfo;
    setLoading(true);
    try {
        weatherInfo = await weather.fetchWeather(await weather.getUserCordinate());
    } catch (error) {
        setLoading(false);
    }
    if (!(weatherInfo.current && weatherInfo.location)) {
        alert("error");
    }
    console.log(weatherInfo);
    updateUi(weatherInfo);
    setLoading(false);
    // alert('success');
}

async function updateUi(weatherInfo) {

    try {
        document.getElementById("ui-celsius").innerHTML = `${Math.floor(weatherInfo.current.temp_c)}°`;
        document.getElementById("ui-word-condition").innerHTML = weatherInfo.current.condition.text;
        document.getElementById("ui-date").innerHTML = weather.formatDate(weatherInfo.current.last_updated);
        let iconSize = '128';
        document.getElementById("weather-icon-condition").src = `//cdn.weatherapi.com/weather/${iconSize}x${iconSize}/day/${weatherInfo.current.condition.icon.split('/').pop()}`;
        document.getElementById("ui-humidity").innerHTML = `${weatherInfo.current.humidity}%`;
        document.getElementById("ui-cloud-cover").innerHTML = `${weatherInfo.current.cloud}%`;
        document.getElementById("ui-wind-speed").innerHTML = `${Math.floor(weatherInfo.current.wind_mph)}mp/h ~ ${Math.floor(weatherInfo.current.wind_kph)}kp/h`;
        document.getElementById("ui-feelslike").innerHTML = `${Math.floor(weatherInfo.current.feelslike_c)}°C`;
        document.getElementById("ui-pressure").innerHTML = `${weatherInfo.current.pressure_mb} mb`;
        document.getElementById("ui-wind-gust").innerHTML = `${Math.floor(weatherInfo.current.gust_mph)}mph`;
        document.getElementById("ui-visibility").innerHTML = `${weatherInfo.current.vis_km}km`;
        document.getElementById("ui-uv-index").innerHTML = `${weatherInfo.current.uv} Low`;
        document.getElementById("current-location-text").innerHTML = `${weatherInfo.location.name}, ${weatherInfo.location.region}`;
        document.getElementById("bg-image").style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.34), rgba(0, 0, 0, 0.34)), url(./assets/condition/${recommendPic(weatherInfo.current.condition.text)})`;
        document.getElementById("ui-compass-arrow").style.setProperty('--rotation', `${weatherInfo.current.wind_degree}deg`);
        console.log(weatherInfo.location);
        if (weatherInfo.current.alerts && Array.isArray(weatherInfo.current.alerts) && weatherInfo.current.alerts.length > 0) {
            document.getElementById("ui-weather-alert").style.display = "block";
            document.getElementById("alert-text").innerHTML = weatherInfo.current.alerts[0].description;
        } else {
            document.getElementById("ui-weather-alert").style.display = "none";
        }
    } catch (error) {
        console.log(error);
    }


}


window.addEventListener('DOMContentLoaded', async () => {
    await updateUiBasedByUserLocation()

    const form = document.querySelector('.search-form');
    form.addEventListener('submit', (event) => {
        try {
            event.preventDefault();
        } catch (error) {
            console.log(error);
        }
        getWeather(event.target.location.value);
    });

    document.getElementById('ui_location_input').addEventListener('input', async () => {
        console.log('hey there');
        let suggestedCity = await weather.getCitySuggestion(document.getElementById('ui_location_input').value);
        let location_suggestions_el = document.getElementById('location_suggestions');
        location_suggestions_el.innerHTML = ''
        for (const city of suggestedCity) {
            let suggested_item = document.createElement("p");
            suggested_item.addEventListener('click', () => {
                console.log("clicked suggestion : ", city);
                getWeather(city.name);
                location_suggestions_el.innerHTML = '';
                document.getElementById('ui_location_input').value = '';
            })
            suggested_item.innerHTML = `${city.name}, ${city.region}`;
            location_suggestions_el.appendChild(suggested_item);
        }
    });
})