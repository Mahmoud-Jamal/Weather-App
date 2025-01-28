var searchInput = document.getElementById('search')
var searchBtn = document.getElementById('btn')
var weather = document.getElementById('demo')

searchBtn.addEventListener('click', function () {

    if (searchInput.value.trim()) {
        getData(searchInput.value.trim())
        searchInput.value = ''
    }
})

document.addEventListener('keyup', function (e) {

    if (e.key == 'Enter' && searchInput.value.trim()) {
        getData(searchInput.value.trim())
        searchInput.value = ''
    }
})
searchInput.addEventListener('input', function () {

    if (searchInput.value.trim()) {
        getData(searchInput.value.trim())
    }

})

async function getData(city) {

    // Check if the API request was successful

    var data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ec92ba862db642d491b213748240112&q=${city}&days=3`)
    if (data.ok) {
        var result = await data.json()
        document.querySelector('.Err').classList.add('d-none')
        weather.classList.remove('d-none')
        disPlay(result)


    } else {
        document.querySelector('.Err').classList.remove('d-none')
        weather.classList.add('d-none')


    }
}



function disPlay(result) {
    weather.innerHTML =
        `
    <div class="px-3">
                <div class="weather-info mt-4 d-flex justify-content-between align-items-center">
                    <div class="weather-location d-flex align-items-center">
                        <i class="fa-solid fa-location-dot pe-2 pb-2 fs-5"></i>
                        <h3 class="fs-5 fw-semibold">${result.location.name}</h3>
                    </div>
                    <div class="weather-date">
                        <h5 class="fw-light fs-6">${getDate(result, 0)}</h5>
                    </div>
                </div>
                <div class="weather-statue mt-4 d-flex justify-content-between align-items-center">
                    <!-- Use the correct icon from the API -->
                    <img src="https:${result.current.condition.icon}" alt="" width ="120px">
                    <div>
                        <h2 class="h1 fw-semibold">${result.current.temp_c} °C</h2>
                        <h3>${result.current.condition.text}</h3>
                    </div>
                </div>
                <div class="d-flex justify-content-between mt-3">
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-droplet pe-2 fs-3 pb-2"></i>
                        <div>
                            <span class="">Humidity</span>
                            <p class="text-center">${result.current.humidity}%</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fa-solid fa-wind pe-2 fs-3 pb-2"></i>
                        <div>
                            <span>Wind Speed</span>
                            <p class="text-center">${result.current.wind_kph} km/h</p>
                        </div>
                    </div>
                </div>
                <div class="container px-0">
                    <div class="row g-3">
                        <div class="col-6">
                            <div class="rounded-2 bg-m text-center py-2">
                                <p class="mb-1">${getDate(result, 1)}</p>
                                <!-- Use the correct icon for the forecast day -->
                                <img src="https:${result.forecast.forecastday[1].day.condition.icon}" alt="" width="70px">
                                <p class="mb-1 fw-semibold">${result.forecast.forecastday[1].day.condition.text}</p>
                                <div class="pt-2">
                                <p class="mb-1">${result.forecast.forecastday[1].day.maxtemp_c} °C</p>
                                <p class="mb-1 min-temp">${result.forecast.forecastday[1].day.mintemp_c} °C</p>
                                </div>
                                </div>
                                </div>
                                <div class="col-6">
                                <div class="rounded-2 bg-m text-center py-2">
                                <p class="mb-1">${getDate(result, 2)}</p>
                                <img src="https:${result.forecast.forecastday[2].day.condition.icon}" alt="" width="70px">
                                <p class="mb-1 fw-semibold">${result.forecast.forecastday[2].day.condition.text}</p>
                                <div class="pt-2">
                                    <p class="mb-1">${result.forecast.forecastday[2].day.maxtemp_c} °C</p>
                                    <p class="mb-1 min-temp">${result.forecast.forecastday[2].day.mintemp_c} °C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `
}

function getDate(result, day) {
    var currentDate = new Date(result.forecast.forecastday[day].date)

    var options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'

    }

    return currentDate.toLocaleDateString('en-GB', options)
}




// function getCurrentLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;



//             fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=8c6638c6c9a949a5bb0e3c7bd59c44f7`)
//                 .then(response => response.json())
//                 .then(data => {
//                     // Check if the request was successful
//                     if (data.results && data.results.length > 0) {
//                         var location = data.results[0];
//                         var currentLocation = location.components.city;
//                         getData(currentLocation)




//                     }
//                     //  else {
//                     //     getData(cairo)
//                     //     // console.error('No location found for these coordinates');
//                     // }
//                 });

//         });
//     }
// }

// getCurrentLocation()


