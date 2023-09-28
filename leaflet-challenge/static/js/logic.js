//this is drawing the heatmap, which is the density of the number of hydrants 
let myMap = L.map("map", {
  center: [0, 0],
  zoom: 2.45
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// you could call response data the name doesnt matter for that 
d3.json(url).then(function(response) {

// set features variable 
let features = response.features;

console.log(features);

//set marker traits
let geojson = L.geoJSON(features, {
  pointToLayer: function(feature) {
    return L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      radius: getMarkerSize(feature.properties.mag) * 2,
      fillColor: getMarkerColor(feature.geometry.coordinates[2]), 
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
  }).addTo(myMap);
},
onEachFeature: function (feature,layer){


// Binding a popup to each layer 
  layer.bindPopup("<strong>Magnitude and Location: " + feature.properties.title+ "<br>Depth: "
  + feature.geometry.coordinates[2]);
}
}).addTo(myMap);


// Function to calculate marker size based on magnitude of earthquake
function getMarkerSize(magnitude) {
  return magnitude;
}

//set marker colour based on depth of earthquake 
function getMarkerColor(depth) {
  if(depth > 90){
    col = "#400080";
  }else if(depth > 70 && depth <=90){
    col = "#600080";
  }else if(depth > 50 && depth <=70){
    col = "#e6004c";
  }else if(depth > 30 && depth <=50){
    col =  "#ff6666";
  }else if(depth >= 10 && depth <=30){
    col =  "#ff7733";
  }else if(depth >=-10 && depth <=10){
    col =  "#ffcc66";
  }
  return(col);
}

});
