//declare variables and select elements
var ROOT_URL = 'http://api.openweathermap.org/data/2.5/weather?zip='
var API_KEY ='68ed41fdb7b1406d3363b24d71fb5430'
//grab the cityTitle, Zip input bar, weather div, img with class icon, span with class temp
//span with the clas humid, 
var title = document.querySelector('.cityTitle')
var zip = document.querySelector('.zip')
var weather = document.querySelector('.weather')
var icon = document.querySelector('.icon')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var deg = document.querySelector('.deg')
var convert = document.querySelector('.convert')
var fc 

var icons = {
    "Clouds": "img/cloudy.png",
    "Clear": "img/sun.png",
    "Rain": "img/rain.png",
    "Snow": "img/snow.png",
    "Thunderstrom": "img/thunderstorm.png",
    "Mist": "img/rain.png",
}

//define functions
function iconSelector(weather){
    return icons[weather]
}
function celsToFaren(cels){
    return Math.round((cels * 9/5) + 32)
}
function farenToCelsius(far){
    return Math.round((far - 32) * (5/9))
}
function kelvinToFaren(kelvin){
   return Math.round(kelvin * 9/5 - 459.67)
}
function getWeather(zipCode){
console.log(zipCode)
$.ajax({
    type: 'GET',
    url: `${ROOT_URL}${zipCode},us&appid=${API_KEY}`,
    dataType: 'json',
    success: function(data){
        console.log(data)
        title.textContent = data.name
        weather.textContent = data.weather[0].main
        icon.src = iconSelector(data.weather[0].main)
        temp.textContent = kelvinToFaren(data.main.temp)
        humid.textContent = data.main.humidity
        fc = "f"
    },
    error: function(error){
        console.log("there was an error")
    }
})
}

getWeather('33172')


//call function and or add eventListeners 
zip.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        getWeather(zip.value)
    }
})

convert.addEventListener('click',function(e){
if(fc === "f"){
    temp.textContent = farenToCelsius(temp.textContent)
    deg.innerHTML = "&deg C"
    convert.textContent= "convert to F"
    fc = "c"
} else {
    temp.textContent = celsToFaren(temp.textContent)
    deg.innerHTML = "&deg f"
    convert.textContent="convert to C"
    fc = "f"
}
})