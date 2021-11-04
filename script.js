let map;
let service;
let infowindow;
let marker;
let geocoder;
let responseDiv;
let response;


function initMap() {
  const feistu = new google.maps.LatLng(48.15184970569227, 17.073343716555183);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: feistu,
    zoom: 16,
  });
  const marker1 = new google.maps.Marker({
    position: feistu,
    map,
  });
  const info1 = new google.maps.InfoWindow({
    content:"<b>FEI STU</b> <br>48.1518, 17.0733"
  });
  marker1.addListener("click",() => {
    info1.open(map, marker1);
  });

  var requests = {
    location: feistu,
    radius: '1000',
    type: ['transit_station']
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(requests, callbacks);


//   geocoder = new google.maps.Geocoder();

//   const inputText = document.addEventListener("text-input");

//   inputText.type = "text";
//   inputText.placeholder = "Enter a location";

//   const submitButton = document.addEventListener("submit-btn");

//   submitButton.type = "button";
//   submitButton.value = "Geocode";
//   submitButton.classList.add("button", "button-primary");

//   const clearButton = document.createElement("input");

//   clearButton.type = "button";
//   clearButton.value = "Clear";
//   clearButton.classList.add("button", "button-secondary");
//   response = document.createElement("pre");
//   response.id = "response";
//   response.innerText = "";
//   responseDiv = document.createElement("div");
//   responseDiv.id = "response-container";
//   responseDiv.appendChild(response);

//   const instructionsElement = document.createElement("p");

//   instructionsElement.id = "instructions";
//   instructionsElement.innerHTML =
//     "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
//   map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
//   map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
//   marker = new google.maps.Marker({
//     map,
//   });
//   map.addListener("click", (e) => {
//     geocode({ location: e.latLng });
//   });
//   submitButton.addEventListener("click", () =>
//     geocode({ address: inputText.value })
//   );
//   clearButton.addEventListener("click", () => {
//     clear();
//   });
//   clear();
// }

// function clear() {
//   marker.setMap(null);
//   responseDiv.style.display = "none";
// }

// function geocode(request) {
//   clear();
//   geocoder
//     .geocode(request)
//     .then((result) => {
//       const { results } = result;

//       map.setCenter(results[0].geometry.location);
//       marker.setPosition(results[0].geometry.location);
//       marker.setMap(map);
//       responseDiv.style.display = "block";
//       response.innerText = JSON.stringify(result, null, 2);
//       return results;
//     })
//     .catch((e) => {
//       alert("Geocode was not successful for the following reason: " + e);
//   });

  const request = {
    query: "Fakulta elektrotechniky a informatiky Slovenskej technickej univerzity v Bratislave",
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
  var panoramaOptions = {
    position: feistu,
    pov: {
      heading: 34,
      pitch: 10
    }
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
  map.setStreetView(panorama);
}
  
function callbacks(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name(""));
    infowindow.open(map);
  });
}

