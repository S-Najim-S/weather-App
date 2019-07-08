window.addEventListener('load' , () => {

	let long;
	let lat;

	let currentTemperature = document.querySelector('#currentTemperature');
	let currentSum = document.querySelector('#currentSummary');
	// console.log(currentSum.textContent);

	let earlyAmTemperature = document.querySelector('#earlyAmTemperature');
	let earlyAmSum = document.querySelector('#earlyAmSummary');

	let todayTemperature = document.querySelector('#todayTemperature');
	let todaySum = document.querySelector('#todaySummary');

	let tonightTemperature = document.querySelector('#tonightTemperature');
	let tonightSummary = document.querySelector('#tonightSummary');

	let locationTimezone = document.querySelector('.location-timezone');

	let currentTemperatureSection = document.querySelector('#currentTemperatureSection');
	let earlyAmTemperatureSection = document.querySelector('#earlyAmTemperatureSection');
	let todayTemperatureSection = document.querySelector('#todayTemperatureSection');
	let tonightTemperatureSection = document.querySelector('#tonightTemperatureSection');

	let tempDegree = document.querySelector('.tempDegree');
	// let earlyAmTempSec = document.querySelector('.earlyAmTemperature');
	// let todayTempSec = document.querySelector('.todayTemperature');
	// let tonightTempSec = document.querySelector('.tonightTemperature');

	let currentSpan = document.querySelector('#currentSpan');
	let earlyAmSpan = document.querySelector('#earlyAmSpan');
	let todaySpan = document.querySelector('#todaySpan');
	let tonightSpan = document.querySelector('#tonightSpan');

	

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/7fdd4f767c7f24389f877a4e7334cb20/${lat},${long}`;

			fetch(api)
				.then(response =>{
					return response.json();
				})
				.then(data =>{

					currentTemperature.textContent = Math.floor(data.currently.temperature);
					currentSum.textContent = (data.currently.summary);

					todayTemperature.textContent = Math.floor(data.hourly.data[4].apparentTemperature);
					todaySummary.textContent = data.daily.data[4].summary;
			
					locationTimezone.textContent = data.timezone;
					setIcons(data.currently.icon,document.querySelector('.currentIcon'));
					setIcons(data.hourly.data[39].icon,document.querySelector('.earlyAmIcon'));
					setIcons(data.daily.data[1].icon,document.querySelector('.todayIcon'));
					console.log(data);
					
					const keys = Object.values(data.hourly.data);

					for (i = 0; i<= keys.length-1; i++) {

						  if(data.hourly.data[i].icon == 'clear-night'){
						  	tonightTemperature.textContent = Math.floor(data.hourly.data[i].apparentTemperature);
							tonightSummary.textContent = data.hourly.data[i].summary;
							setIcons(data.hourly.data[i].icon,document.querySelector('.tonightIcon'));
						  }

					}

					for (i = 0; i<= keys.length-1; i++) {

						  if(data.hourly.data[i].icon == 'clear-day'){
						  	earlyAmTemperature.textContent = Math.floor(data.hourly.data[i].apparentTemperature);
							earlyAmSummary.textContent = data.hourly.data[i].summary;
						  }

					}

					if(data.currently.icon == 'clear-day'){

						document.getElementById('body').style.backgroundImage="url(img/clearWeather.png)";
						document.querySelector('.quote').textContent = "once you have tasted the taste of sky you will forever look up.";
						document.getElementById("quoteId").style.textColor = "blue";

					} else if(data.currently.icon == "partly-cloudy-day") {

						document.getElementById('body').style.backgroundImage="url(img/clearWeather.png)";
						document.getElementById('background-wrap').style.display = "block";
												
					}else if(data.currently.icon == "cloudy-day") {

						document.getElementById('body').style.backgroundImage="url(img/cloudy.png)";
						document.getElementById('background-wrap').style.display = "block";
												
					}
					 else if(data.currently.icon == "rainy-day") {

						document.getElementById('body').style.backgroundImage="url(img/cloudy-day.png)";
						document.getElementById('body').classList.add('rain');
												
					} else if(data.currently.icon == "snowy-day") {

						document.getElementById('body').style.backgroundImage="url(img/clearWeather.png)";
						document.getElementById('body').classList.add('snow');
					}
					else if(data.currently.icon == "clear-night") {
						document.getElementById('body').style.backgroundImage="url(img/clearNight.jpg)";
						document.querySelector('.quote').textContent = "once you have tasted the taste of sky you will forever look up.";
					}
					else if(data.currently.icon == 'partly-cloudy-night') {
						document.getElementById('body').style.backgroundImage="url(img/cloudyNight.jpg)";
						document.getElementById('background-wrap').style.display = "block";


					}else if(data.currently.icon == "rainy-night") {

						document.getElementById('body').style.backgroundImage="url(img/cloudyNight.jpg)";
						document.getElementById('body').classList.add('rain');
												
					}else if(data.currently.icon == "snowy-night") {

						document.getElementById('body').style.backgroundImage="url(img/cloudyNight.jpg)";
						document.getElementById('body').classList.add('snow');
					}


					celcConv(currentTemperatureSection,currentTemperature,currentSpan,parseInt(currentTemperature.textContent));
					celcConv(earlyAmTemperatureSection,earlyAmTemperature,earlyAmSpan,parseInt(earlyAmTemperature.textContent));
					celcConv(todayTemperatureSection,todayTemperature,todaySpan,parseInt(todayTemperature.textContent));
					celcConv(tonightTemperature,tonightTemperature,tonightSpan,parseInt(tonightTemperature.textContent));

				});
			});
		}

	function setIcons(icon,iconID){
		const skycons = new Skycons({color: 'black'});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

	function celcConv(tempSec,tempDegree,span,temperature){

		let celciuse = Math.floor(temperature -32) * (5/9);

		tempSec.addEventListener("click", () =>{
			if(span.textContent == "°F"){
				span.textContent = "°C";
				tempDegree.textContent = Math.floor(celciuse);
			}else{
				span.textContent = "°F";
				tempDegree.textContent = temperature;
				}	
		});
		
	}
});