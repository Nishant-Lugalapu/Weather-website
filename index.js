const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = 'b310828117f210abbab6af92fd1d7537';
    const city = document.querySelector('.search-box input').value;

    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherbox.classList.remove('active');
            weatherdetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temp = document.querySelector('.weather-box .temperature');
        const desp = document.querySelector('.weather-box .description');
        const wind = document.querySelector('.weather-details .humidity span');
        const humidity = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'css/img/clear.png';
                    break;
                case 'Rain':
                    image.src = 'css/img/rain.png';
                    break;
                case 'Snow':
                    image.src = 'css/img/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'css/img/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'css/img/mist.png';
                    break;
                case 'Haze':
                    image.src = 'css/img/mist.png';
                    break;
                default:
                    image.src = 'css/img/cloud.png';
                    break;
            }

            temp.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            desp.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            const contentinfo = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elClonecontentInfo = contentinfo.cloneNode(true);
            const elCloneinfoHumidity = infoHumidity.cloneNode(true);
            const elCloneinfoWind = infoWind.cloneNode(true);

            elClonecontentInfo.id = 'clone-info-weather';
            elClonecontentInfo.classList.add('active-clone');

            elCloneinfoHumidity.id = 'clone-info-humidity';
            elCloneinfoHumidity.classList.add('active-clone');

            elCloneinfoWind.id = 'clone-info-wind';
            elCloneinfoWind.classList.add('active-clone');

            setTimeout(() => {
                contentinfo.insertAdjacentElement("afterend", elClonecontentInfo);
                infoHumidity.insertAdjacentElement("afterend", elCloneinfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneinfoWind);
            }, 2200);

            const ClonecontentInfo = document.querySelectorAll('.info-weather.active-clone');
            const totalClonecontentInfo = ClonecontentInfo.length;
            const ClonecontentInfoFirst = ClonecontentInfo[0];

            const CloneinfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const CloneinfoHumidityFirst = CloneinfoHumidity[0];

            const CloneinfoWind = document.querySelectorAll('.info-wind.active-clone');
            const CloneinfoWindFirst = CloneinfoWind[0];

            if (totalClonecontentInfo > 0) {
                ClonecontentInfoFirst.classList.remove('active-clone');
                CloneinfoHumidityFirst.classList.remove('active-clone');
                CloneinfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    ClonecontentInfoFirst.remove();
                    CloneinfoHumidityFirst.remove();
                    CloneinfoWindFirst.remove();
                }, 2200);
            }
        }
    });
})