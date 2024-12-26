export default class Weather {
    getApiKey() {
        return '34768342301d4b8eb51120026242612';
    }
    getApi(location) {
        return `http://api.weatherapi.com/v1/current.json?key=${this.getApiKey()}&q=${location}`
    }
    constructor() { }

    async test() {
        console.log("test");
        this.fetchWeather(await this.getUserCordinate());
    }
    async fetchWeather(location) {
        const res = await fetch(this.getApi(location));
        const data = await res.json();
        console.log(data);
    }
    async getUserCordinate() {
        let userLocation;
        if ('permissions' in navigator) {
            try {
                const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
                console.log('Geolocation permission state is: ', permissionStatus.state);
                if (permissionStatus.state === 'granted') {
                    console.log('Permission granted, you can access location');
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    console.log(`${position.coords.latitude} : ${position.coords.longitude}`);
                    userLocation = `${position.coords.latitude},${position.coords.longitude}`;
                    console.log("location grabbed");
                } else if (permissionStatus.state === 'denied') {
                    console.error('Permission denied');
                } else if (permissionStatus.state === 'prompt') {
                    console.log('Permission prompt is pending');
                }
            } catch (error) {
                console.error('Permission query failed:', error);
            }
            console.log("User Location the one grabbed :", userLocation);
        } else {
        }
        return userLocation ? userLocation : `12.9333,78.7167`;
    }
}