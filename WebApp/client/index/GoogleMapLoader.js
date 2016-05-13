/**
 * Created by Brandon on 4/13/2016.
 */

var map,
    io = require('./socket.io-1.4.5'),
    activePoints = [],
    allMarkers = [],
    allLines = [];

function initMap() {
    var mapDiv = document.getElementById('Google_Map');
    map = new google.maps.Map(mapDiv, {
        center: {lat: 39.1836, lng: -96.5717},
        zoom: 14
    });
}

var socket = io.connect('localhost:8080');
socket.on('device-location', function(data){
    if(!checkForCookie(data.id))
        createNewMarker(data)
    else
        updateOldMarker(data)
});

socket.on('clear-map', function(){
    for(var i=0,l=allMarkers.length;i<l;i++){
        allMarkers[i].setMap(null);
    }
    for(var j=0,jl=allLines.length;j<jl;j++){
        allLines[j].setMap(null);
    }
    allLines = [];
    allMarkers = [];
});

socket.on('update-Leaderboard', function(data){updateLeaderBoard(data.Commander, data.Leaders)});

function updateOldMarker(data){
    for(i=0, len = activePoints.length; i<len; i++){
        if(activePoints[i].val == data.id){
            activePoints[i].Marker.setIcon('./icons/square.svg');
            var oldMarker = activePoints[i].Marker
            activePoints[i].Marker = displayPoint(parseFloat(data.lat), parseFloat(data.long));
            createLine(oldMarker, activePoints[i].Marker)
        }
    }
}

function createLine(oldData, newData){
    var newLine = new google.maps.Polyline({
        path: [{lat: oldData.getPosition().lat(), lng: oldData.getPosition().lng()}, {lat: newData.getPosition().lat(), lng: newData.getPosition().lng()}],
        geodesic: true,
        strokeColor: 'black',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    allLines.push(newLine);
    newLine.setMap(map)
}

function createNewMarker(data){
    var markerPos = displayPoint(parseFloat(data.lat), parseFloat(data.long));
    activePoints.push({'val': data.id, 'Marker':markerPos});
}

function checkForCookie(userId){
    for(i=0, len = activePoints.length; i<len; i++){
        if(activePoints[i].val == userId)
            return true
    }
    return false
}

function displayPoint(lat, long){
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: long},
        map: map
    });
    allMarkers.push(marker);
    return marker
}

function updateLeaderBoard(Commander, Leaders){
    var commandName = document.getElementsByClassName('Parent_Unit')[0].childNodes[1]
    commandName.innerHTML = Commander;
    commandName.setAttribute('onclick', 'addShowing("'+commandName+'")')
    var list = document.getElementById('ChildUnitList');
    list.innerHTML = '';
    for(var i=0,l=Leaders.length;i<l;i++){
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(Leaders[i]));
        li.setAttribute('onclick', 'modifyShowing("'+Leaders[i]+'")');
        list.appendChild(li);
    }

}

initMap();

