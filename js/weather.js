export default class Weather {
    getApiKey() {
        return '34768342301d4b8eb51120026242612';
    }
    getApi(location) {
        return `http://api.weatherapi.com/v1/current.json?key=${this.getApiKey()}&q=${location}`
    }
    constructor() {
        // fetch(`https://api.tomorrow.io/v4/weather/forecast?location=deLhi&apikey=${this.getApiKey()}`);
    }
    test() {
        console.log("test");
        this.getLocation(this.getUserCordinate());
    }
    async getLocation(location) {
        const res = await fetch(this.getApi(location));
        const data = await res.json();
        console.log(data);
    }
    getUserCordinate() {
        return new Promise((resolve, reject) => {
            if ('permissions' in navigator) {
                navigator.permissions.query({ name: 'geolocation' })
                    .then(function (permissionStatus) {
                        console.log('Geolocation permission state is: ', permissionStatus.state);
                        if (permissionStatus.state === 'granted') {
                            console.log('Permission granted, you can access location');
                            navigator.geolocation.getCurrentPosition((p) => {
                                const location = `${p.coords.latitude},${p.coords.longitude}`;
                                console.log(location);
                                resolve(location);
                            }, (error) => {
                                console.error('Error getting location:', error);
                                reject('Error getting location');
                            });
                        } else if (permissionStatus.state === 'denied') {
                            console.log('Permission denied');
                            reject('Permission denied');
                        } else if (permissionStatus.state === 'prompt') {
                            console.log('Permission prompt is pending');
                            navigator.geolocation.getCurrentPosition((p) => {
                                const location = `${p.coords.latitude},${p.coords.longitude}`;
                                console.log(location);
                                resolve(location);
                            }, (error) => {
                                console.error('Error getting location:', error);
                                reject('Error getting location');
                            });
                        }
                    })
                    .catch(function (error) {
                        console.error('Permission query failed:', error);
                        reject('Permission query failed');
                    });
            } else {
                console.log('Permissions API is not supported in this browser');
                reject('Permissions API is not supported in this browser');
            }
        });
    }
}