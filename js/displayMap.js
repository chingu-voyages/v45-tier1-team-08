// I am using this as reference for the map: https://d3-graph-gallery.com/graph/bubblemap_leaflet_basic.html

var map = L.map("map").setView([40.7448855, -74.0131188], 1); //position of the element in the HTML will depends on the element given - here, an id selected div called "map"; the second argument of setView is the zoom level

// Add a tile to the map = a background. Comes from OpenStreetmap
L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map); // the style of the map can be changed

// Add a svg layer to the map
L.svg().addTo(map);

// Create data for circles:
var markers = [
  { long: 9.083, lat: 42.149 }, // corsica
  { long: 7.26, lat: 43.71 }, // nice
  { long: 2.349, lat: 48.864 }, // Paris
  { long: -1.397, lat: 43.664 }, // Hossegor
  { long: 3.075, lat: 50.64 }, // Lille
  { long: -3.83, lat: 48 }, // Morlaix
];

// Select the svg area and add circles:
d3.select("#map")
  .select("svg")
  .selectAll("myCircles")
  .data(markers)
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return map.latLngToLayerPoint([d.lat, d.long]).x;
  })
  .attr("cy", function (d) {
    return map.latLngToLayerPoint([d.lat, d.long]).y;
  })
  .attr("r", 2) // bubble radius (to be customized)
  .style("fill", "purple") // bubble color
  .attr("stroke", "purple") // bubble border color
  .attr("stroke-width", 1)
  .attr("fill-opacity", 0.4);

// Function that update circle position if something change
function update() {
  d3.selectAll("circle")
    .attr("cx", function (d) {
      return map.latLngToLayerPoint([d.lat, d.long]).x;
    })
    .attr("cy", function (d) {
      return map.latLngToLayerPoint([d.lat, d.long]).y;
    });
}

// If the user change the map (zoom or drag), I update circle position:
map.on("moveend", update);
