export default class Weather {
    getApiKey() {
        return "34768342301d4b8eb51120026242612";
    }
    getApi(location) {
        return `http://api.weatherapi.com/v1/current.json?key=${this.getApiKey()}&q=${location}`;
    }
    getSuggestionApi(typedInput) {
        return `http://api.weatherapi.com/v1/search.json?key=${this.getApiKey()}&q=${typedInput}`;
    }
    constructor() { }

    async getCitySuggestion(typedInput) {
        const res = await fetch(this.getSuggestionApi(typedInput));
        const data = await res.json();
        console.log('data:', data)
        let suggestedLocation = [];
        try {
            data.forEach(suggestedCity => {
                suggestedLocation.push({ name: suggestedCity.name, region: suggestedCity.region })
            });
        } catch (error) {
            return suggestedLocation;
        }
        console.log('suggested location:', suggestedLocation)
        return suggestedLocation;
    }

    async test() {
        console.log("test");
        console.log(this.fetchWeather(await this.getUserCordinate()));
    }
    async fetchWeather(location) {
        const res = await fetch(this.getApi(location));
        const data = await res.json();
        return data;
    }
    async getUserCordinate() {
        let userLocation;
        if ("permissions" in navigator) {
            try {
                const permissionStatus = await navigator.permissions.query({
                    name: "geolocation",
                });
                console.log(
                    "Geolocation permission state is: ",
                    permissionStatus.state
                );
                if (permissionStatus.state === "granted") {
                    console.log("Permission granted, you can access location");
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    console.log(
                        `${position.coords.latitude} : ${position.coords.longitude}`
                    );
                    userLocation = `${position.coords.latitude},${position.coords.longitude}`;
                    console.log("location grabbed");
                } else if (permissionStatus.state === "denied") {
                    console.error("Permission denied");
                } else if (permissionStatus.state === "prompt") {
                    console.log("Permission prompt is pending");
                }
            } catch (error) {
                console.error("Permission query failed:", error);
            }
        } else {
        }
        return userLocation ? userLocation : `12.9333,78.7167`;
    }
    formatDate(inputDate) {
        const date = new Date(inputDate);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const [weekday, day, month, year] = formattedDate.split(' ');
        return `${weekday} ${day}, ${month.charAt(0).toUpperCase() + month.slice(1)} '${year}`;
    }
}
