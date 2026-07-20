const apiKey="ea6f0022c04773950a834ab3919f439b";

const cityInput = document.getElementById("city");
const error = document.getElementById("error");

async function getWeather() {

    const city = cityInput.value.trim();

    if(city===""){
        showError("Please enter a city name.");
        return;
    }

    error.innerHTML="";

    document.getElementById("loading").style.display="block";

    try{

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        updateUI(data);

    }catch(err){

        clearUI();
        showError(err.message);

    }finally{

        document.getElementById("loading").style.display="none";

    }

}

function updateUI(data){

    document.getElementById("cityName").innerHTML =
    `${data.name}, ${data.sys.country}`;

    document.getElementById("temp").innerHTML =
    `${Math.round(data.main.temp)}°C`;

    document.getElementById("description").innerHTML =
    data.weather[0].description;

    document.getElementById("humidity").innerHTML =
    data.main.humidity + "%";

    document.getElementById("wind").innerHTML =
    Math.round(data.wind.speed*3.6)+" km/h";

    document.getElementById("pressure").innerHTML =
    data.main.pressure+" hPa";

    document.getElementById("feels").innerHTML =
    Math.round(data.main.feels_like)+"°C";

    document.getElementById("visibility").innerHTML =
    (data.visibility/1000).toFixed(1)+" km";

    document.getElementById("sunrise").innerHTML =
    convertTime(data.sys.sunrise);

    document.getElementById("sunset").innerHTML =
    convertTime(data.sys.sunset);

    const icon = document.getElementById("icon");

    icon.src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    changeBackground(data.weather[0].main);

}

function convertTime(time){

    return new Date(time*1000).toLocaleTimeString([],{
        hour:'2-digit',
        minute:'2-digit'
    });

}

function changeBackground(weather){

    const body=document.body;

    switch(weather){

        case "Clear":
            body.className="clear";
            break;

        case "Clouds":
            body.className="clouds";
            break;

        case "Rain":
            body.className="rain";
            break;

        case "Snow":
            body.className="snow";
            break;

        case "Thunderstorm":
            body.className="storm";
            break;

        default:
            body.className="default";

    }

}

function clearUI(){

    document.getElementById("cityName").innerHTML="--";

    document.getElementById("temp").innerHTML="--°C";

    document.getElementById("description").innerHTML="--";

    document.getElementById("humidity").innerHTML="--";

    document.getElementById("wind").innerHTML="--";

    document.getElementById("pressure").innerHTML="--";

    document.getElementById("feels").innerHTML="--";

    document.getElementById("visibility").innerHTML="--";

    document.getElementById("sunrise").innerHTML="--";

    document.getElementById("sunset").innerHTML="--";

    document.getElementById("icon").src="";
}

function showError(msg){

    error.innerHTML=msg;

}

cityInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        getWeather();

    }

});
const themeBtn = document.getElementById("themeToggle");
const icon = themeBtn.querySelector("i");

// Load saved theme
let savedTheme = localStorage.getItem("theme");

if(savedTheme){
    document.body.classList.add(savedTheme);

    if(savedTheme==="light"){
        icon.className="fa-solid fa-sun";
    }else{
        icon.className="fa-solid fa-moon";
    }
}else{
    document.body.classList.add("dark");
}

themeBtn.onclick = () => {

    if(document.body.classList.contains("dark")){

        document.body.classList.remove("dark");
        document.body.classList.add("light");

        icon.className="fa-solid fa-sun";

        localStorage.setItem("theme","light");

    }else{

        document.body.classList.remove("light");
        document.body.classList.add("dark");

        icon.className="fa-solid fa-moon";

        localStorage.setItem("theme","dark");

    }

};