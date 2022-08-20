var apiKey = "29d121bfb0ba4ecf8d2d417144ee1c27";
var city = "";
var citySearchEl = document.querySelector("#citySearch");
var searchButton = document.querySelector("#search");
var searchButton2 = document.querySelector("#search2");
var searchButton3 = document.querySelector("#search3");
var searchButton4 = document.querySelector("#search4");
var weatherBoard = document.querySelector("#weatherBoard");
var currentTemp = document.querySelector("#temperature");
var currentHumidity = document.querySelector("#humidity");
var currentWind = document.querySelector("#wind");
var currentUv = document.querySelector("#uv");
var oldSearch = document.getElementsByClassName("oldSearch");
var cityNameDate = document.querySelector("#cityName");
var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var dateCall = new Date();
var date =
	month[dateCall.getMonth()] +
	"/" +
	dateCall.getDate() +
	"/" +
	dateCall.getFullYear();

var weatherFunctions = function (city) {
	console.log(city);
	var forecastApi =
		"https://api.weatherbit.io/v2.0/forecast/daily?key=" +
		apiKey +
		"&city=" +
		city +
		"&units=I";
	var cityApi =
		"https://api.weatherbit.io/v2.0/current?key=" +
		apiKey +
		"&city=" +
		city +
		"&units=I";

	console.log(cityApi);
	fetch(cityApi)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			currentWeather(data);
		});

	var currentWeather = function (current) {
		var weatherIcon = document.createElement("img");
		weatherIcon.src = "./assets/icons/" + current.data[0].weather.icon + ".png";

		cityNameDate.textContent = current.data[0].city_name + " " + date;
		cityNameDate.appendChild(weatherIcon);

		currentTemp.textContent = "Temperature: " + current.data[0].temp + "°F";
		currentHumidity.textContent = "Humidity: " + current.data[0].rh + "%";
		currentWind.textContent =
			"Wind: " + current.data[0].wind_spd + " mph " + current.data[0].wind_cdir;
		currentUv.textContent = "UV Index: " + current.data[0].uv.toFixed(2);
		switch (true) {
			case current.data[0].uv < 3:
				currentUv.removeAttribute("class");
				currentUv.classList.add("low");
			case current.data[0].uv >= 3 && current.data[0].uv < 6:
				currentUv.removeAttribute("class");
				currentUv.classList.add("moderate");
			case current.data[0].uv >= 6 && current.data[0].uv < 8:
				currentUv.removeAttribute("class");
				currentUv.classList.add("high");
			case current.data[0].uv >= 8 && current.data[0].uv < 11:
				currentUv.removeAttribute("class");
				currentUv.classList.add("very-high");
			case current.data[0].uv >= 11:
				currentUv.removeAttribute("class");
				currentUv.classList.add("extreme");
		}
	};

	fetch(forecastApi)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
};
citySearchEl.addEventListener("submit", function (event) {
	event.preventDefault();
	var userInput = document.querySelector("#userInput");
	city = userInput.value;
	userInput.value = "";
	weatherFunctions(city);
});

for (i = 0; i < oldSearch.length; i++) {
	oldSearch[i].addEventListener("click", function (event) {
		event.preventDefault();
		city = event.target.value;
		weatherFunctions(city);
	});
}
