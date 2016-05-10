$("#all").change(function () {
      $("input:checkbox").prop('checked', $(this).prop("checked"));
});
$("#get").click(
		function(e) {
			e.preventDefault();
			var city = $("#city").val();
			var params = new Array;

			params["weather"] = $("#weather").is(":checked");
			params["temperature"] = $("#temperature").is(":checked");
			params["humidity"] = $("#humidity").is(":checked");
			params["wind"] = $("#wind").is(":checked");

			if (!validate(city, params))
				return false;

			$.ajax({
				url : "http://api.openweathermap.org/data/2.5/weather?q="
						+ city + "&APPID=737644008a671360204d9b3ee4d96f0a ",
				success : function(result) {

					$("#report").prepend(
							"<div class = 'city'><h2>" + result.name
									+ " </h2></div>");
					
					if (params["weather"]) {
						console.log(result);
						$(".city:first").append(
								"<p>Weather: " + result.weather[0].description
										+ "</p>");
					}

					if (params["temperature"]) {
						$(".city:first").append(
								"<p>Temperature: "
										+ getCelsius(result.main.temp)
										+ " C&deg</p>");
					}

					if (params["humidity"]) {
						$(".city:first").append(
								"<p>Humidity: " + result.main.humidity
										+ " %</p>");
					}
					if (params["wind"]) {
						$(".city:first").append(
								"<p>Wind: " + getKPH(result.wind.speed)
										+ " km/h</p>");
					}

				}// end of success

			});// end of ajax

			
			$("input[type='checkbox']").attr("checked", false);
			$("#city").val("");
			$("#city").focus();
			return false;
		});// end of #get click



$("#clear").click(function(e) {
	e.preventDefault();
	$("div.city").remove();
	return false;

});// end of clear



function getCelsius(kelvin) {

	return Math.ceil(kelvin - 273.15);

} // end of getCelsius(kelvin)

function getKPH(ms) {
	var result = ms * 18 / 5;
	return result.toFixed(2);
}// end of getKPH(ms)

function validate(city, params) {

	if (city.length < 1) {
		alert("Please enter a city");
		return false;
	}
	var checked = false;

	for (check in params) {
		if (params[check] === true)
			checked = true;
	}

	if (!checked) {
		alert("Please chose at least one parameter");
		return false;
	}

	return true;
}// end of validate
