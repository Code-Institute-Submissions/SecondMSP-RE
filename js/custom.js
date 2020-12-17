$(document).ready(function(){
    $.instagramFeed({
            'username': 'glorytabernacleinternational',
            'container': "#instagram-feed",
            'display_profile':false,
            'display_biography':false,
            'display_igtv':false,
            'items': 10,
            'items_per_row': 2
          });
          //getLocation();
});
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
alert("Latitude: " + position.coords.latitude + 
"<br>Longitude: " + position.coords.longitude);
}
