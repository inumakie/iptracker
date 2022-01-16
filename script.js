
// search value & button
let ipSearch = document.querySelector('#search-bar');
let button = document.querySelector('#button');

// individual IP information fields
let info_ip = document.querySelector('#info-ip');
let info_location = document.querySelector('#info-location');
let info_timezone = document.querySelector('#info-timezone');
let info_isp = document.querySelector('#info-isp');





// API integration for Leaflet 

let map = L.map('map').setView([-16.55, -68.67], 5);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiaW51bWFraWUiLCJhIjoiY2t3d290amZiMDVyNzJvbGFpOWI4bDE4NiJ9.sCoH7SuL3X_ohxx1R-kRRw'
}).addTo(map);





// When click on 'search':
button.addEventListener('click', () => {
    IPlookup();
});

// IP lookup function
async function IPlookup(){

    let selectedIP = ipSearch.value;

    // !!! The API key used in the request is meant to be stored in a server for security reasons, but I will leave it like this for this mock-up / portfolio app.

    let response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_VHgKvKYZy0a6NX350OVL7lj82IZJF&ipAddress=" + selectedIP);
    let rawData = await response.json();

    info_ip.textContent = rawData.ip;
    info_location.textContent = rawData.location.region + ", " + rawData.location.country;
    info_timezone.textContent = rawData.location.timezone;
    info_isp.textContent = rawData.isp; 

    let latitude = rawData.location.lat;
    let longitude = rawData.location.lng;

    // customize icon/marker

    let blackIcon = L.icon({
        iconUrl: "./images/icon-location.svg",
    });

    // add icon/marker

    L.marker([latitude, longitude], {icon: blackIcon}).addTo(map);
    map.setView([latitude, longitude], 13);
}

// Mobile version 'hide/show' button functionality

// hide text, IP info banner, each individual card
let hideText = document.querySelector("#hide");
let ip_info = document.querySelector(".ip-info");
let cards = document.querySelectorAll(".ip-info-card");

hideText.addEventListener('click', () => {
    ip_info.classList.toggle("toggle");

    cards.forEach( (card) =>{
        card.classList.toggle("display");
    })
});

// if the IP information was hidden in mobile view, this makes sure its shown again if the screen changes size to a bigger resolution, since in bigger screens theres no 'show/hide' button.

let desktopSize = window.matchMedia("(min-width: 560px)");

if (ip_info.hasClass(".toggle") && (desktopSize)){
    ip_info.classList.add("toggle");
}

