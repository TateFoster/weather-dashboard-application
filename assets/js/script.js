var apiKey = "df13069f58f51ee1a88e7d83b05a2d00";
var city;

var forecastApi =
	"https://api.openweathermap.org/data/2.5/forecast?q=" +
	city +
	"&appid=" +
	apiKey +
	"&units=imperial";
var cityApi =
	"https://api.openweathermap.org/data/2.5/weather?q=" +
	city +
	"&appid=" +
	apiKey +
	"&units=imperial";

fetch(forecastApi)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});

fetch(cityApi)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});
