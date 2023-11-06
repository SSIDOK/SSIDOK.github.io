document.addEventListener("DOMContentLoaded", getMyLocation)
let watchId = null;

const collegeCoords = {
    latitude: 48.943004,
    longitude: 24.733679
};


function getMyLocation() {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(displayLocation,displayError);
        var watchButton = document.getElementById('watch');
        watchButton.onclick = watchLocation;
        var clearWatchButton = document.getElementById('clearWatch');
        clearWatchButton.onclick = clearWatch;
    } else {
        alert("Oops, no geolocation support");
    }
}

let markers = [];

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let timestamp = new Date(position.timestamp).toLocaleString();
    let div = document.getElementById("location")
    div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`
    div.innerHTML += `(with ${position.coords.accuracy} meters accuracy)`
    let km = computeDistance(position.coords, collegeCoords)
    let distance = document.getElementById("distance")
    distance.innerHTML = `You are ${km} km from the College`

    let marker = L.marker([latitude, longitude]).addTo(map);

    marker.bindPopup(`Coordinates: Lat ${latitude}, Long ${longitude}<br>Timestamp: ${timestamp}`).openPopup();
    markers.push(marker);
}

document.getElementById('goToDestination').onclick = function () {
    const destinationCoords = document.getElementById('destinationCoords').value;
    const [destLat, destLng] = destinationCoords.split(',').map(parseFloat);

    map.setView([destLat, destLng], 20);
};

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    const errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + "" + error.message;
    }
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371; 

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians (degrees) {
    let radians = (degrees * Math.PI) / 180;
return radians;
}

function watchLocation() {
    watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}

var map = L.map('map').setView([48.920243, 24.709625], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var popup = L.popup();

var marker = L.marker([0, 0]).addTo(map);

function onMapClick(e) {
    var coordinates = e.latlng;
    var latitude = coordinates.lat;
    var longitude = coordinates.lng;

    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at Latitude: " + latitude + ", Longitude: " + longitude)
        .openOn(map);
}

map.on('click', onMapClick);
