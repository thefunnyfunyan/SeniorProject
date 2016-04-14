/**
 * Created by Brandon on 4/13/2016.
 */
var map,
    io = require('./socket.io-1.4.5'),
    activePoints = [];

function initMap() {
    var mapDiv = document.getElementById('Google_Map');
    map = new google.maps.Map(mapDiv, {
        center: {lat: 39.1836, lng: -96.5717},
        zoom: 12
    });
    var marker = new google.maps.Marker({
        position: {lat: 39.1836, lng: -96.5717},
        map: map,
        title: 'test'
    });
    activePoints.push({'Name':'initialPoint', 'Marker':marker})

    var socket = io.connect('http://192.168.1.103:8080');
    socket.on('newLocation', function(data){
        console.log(data);
    })
}

initMap();

function displayPoint(lat, long){
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: map,
        title: 'test'
    });
}



