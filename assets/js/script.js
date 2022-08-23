var apiKey = "a3deedc644dc461ead21a3dcc81e824b";
var city = "";
var citySearchEl = document.querySelector("#citySearch");
var weatherBoard = document.querySelector("#weatherBoard");
var currentTemp = document.querySelector("#temperature");
var currentHumidity = document.querySelector("#humidity");
var currentWind = document.querySelector("#wind");
var currentUv = document.querySelector("#uv");
var oldSearch = document.getElementsByClassName("oldSearch");
var cityNameDate = document.querySelector("#cityName");
var cardDate = document.querySelectorAll(".card-date");
var cardIcon = document.querySelectorAll(".card-icon");
var cardHigh = document.querySelectorAll(".card-high");
var cardLow = document.querySelectorAll(".card-low");
var cardWind = document.querySelectorAll(".card-wind");
var cardHumidity = document.querySelectorAll(".card-humidity");
var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var dateCall = new Date();
var date =
	month[dateCall.getMonth()] +
	"/" +
	dateCall.getDate() +
	"/" +
	dateCall.getFullYear();

var savedLocationData = function () {
	var savedLocations = JSON.parse(localStorage.getItem("savedLocations"));
	if (savedLocations !== null) {
		for (i = 0; i < savedLocations.length; i++) {
			oldSearch[i].value = savedLocations[i];
			oldSearch[i].textContent = savedLocations[i];
		}
		city = savedLocations[0];
		weatherFunctions(city);
	}
};

savedLocationData();

function weatherFunctions(city) {
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

	fetch(cityApi)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			currentWeather(data);
		});

	var currentWeather = function (current) {
		var weatherIcon = document.createElement("img");
		weatherIcon.src = "./assets/icons/" + current.data[0].weather.icon + ".png";

		cityNameDate.textContent =
			current.data[0].city_name +
			", " +
			current.data[0].state_code +
			", " +
			current.data[0].country_code +
			" " +
			date;
		cityNameDate.appendChild(weatherIcon);

		var check =
			current.data[0].city_name +
			", " +
			current.data[0].state_code +
			", " +
			current.data[0].country_code;
		if (
			oldSearch[0].value.match(check) ||
			oldSearch[1].value.match(check) ||
			oldSearch[2].value.match(check) ||
			oldSearch[3].value.match(check)
		) {
		} else {
			for (i = 3; i > 0; i--) {
				oldSearch[i].textContent = oldSearch[i - 1].textContent;
				oldSearch[i].value = oldSearch[i - 1].value;
			}
			oldSearch[0].textContent =
				current.data[0].city_name +
				", " +
				current.data[0].state_code +
				", " +
				current.data[0].country_code;
			oldSearch[0].value =
				current.data[0].city_name +
				", " +
				current.data[0].state_code +
				", " +
				current.data[0].country_code;

			var oldLocations = [];
			for (i = 0; i < oldSearch.length; i++) {
				oldLocations.push(oldSearch[i].value);
			}

			localStorage.setItem("savedLocations", JSON.stringify(oldLocations));
		}
		currentTemp.textContent = "Temperature: " + current.data[0].temp + "°F";
		currentHumidity.textContent = "Humidity: " + current.data[0].rh + "%";
		currentWind.textContent =
			"Wind: " +
			current.data[0].wind_spd +
			" mph going " +
			current.data[0].wind_cdir;
		currentUv.textContent = "UV Index: " + current.data[0].uv.toFixed(2);
		switch (true) {
			case current.data[0].uv < 3:
				currentUv.removeAttribute("class");
				currentUv.classList.add("low");
				break;

			case current.data[0].uv >= 3 && current.data[0].uv < 6:
				currentUv.removeAttribute("class");
				currentUv.classList.add("moderate");
				break;

			case current.data[0].uv >= 6 && current.data[0].uv < 8:
				currentUv.removeAttribute("class");
				currentUv.classList.add("high");
				break;

			case current.data[0].uv >= 8 && current.data[0].uv < 11:
				currentUv.removeAttribute("class");
				currentUv.classList.add("very-high");
				break;

			case current.data[0].uv >= 11:
				currentUv.removeAttribute("class");
				currentUv.classList.add("extreme");
				break;
		}
	};

	fetch(forecastApi)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			forecastWeather(data);
		});

	var forecastWeather = function (forecast) {
		for (i = 1; i < 6; i++) {
			cardDate[i - 1].textContent = forecast.data[i].datetime;
			cardIcon[i - 1].src =
				"./assets/icons/" + forecast.data[i].weather.icon + ".png";
			cardHigh[i - 1].textContent = "High of " + forecast.data[i].high_temp;
			cardLow[i - 1].textContent = "Low of " + forecast.data[i].low_temp;
			cardHumidity[i - 1].textContent =
				"Humidity: " + forecast.data[i].rh + "%";
			cardWind[i - 1].textContent =
				"Wind: " +
				forecast.data[i].wind_spd +
				" mph going " +
				forecast.data[i].wind_cdir;
		}
	};
}
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
