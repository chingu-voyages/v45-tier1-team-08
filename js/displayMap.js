import { linkData, searchData } from "./searchData.js";

let searchValueList = [];
var map;

const formattedSearchData = {
  name: linkData[0],
  year: linkData[1],
  recclass: linkData[2],
  minMassRange: linkData[3],
  maxMassRange: linkData[4],
};

searchData(formattedSearchData).then((res) => {
  searchValueList = res;

  // Conversion of searchData results to a list of GSP coordinates:
  searchValueList = searchValueList
    .filter((result) => result.GeoLocation !== "")
    .map((result) => {
      return { long: result.reclong, lat: result.reclat };
    });
  makeMap( searchValueList );
  
  function makeMap(markers) {
    // I am using this as reference for the map: https://d3-graph-gallery.com/graph/bubblemap_leaflet_basic.html
    
    console.log(markers);
    map = L.map("map").setView([40.7448855, -74.0131188], 1); //position of the element in the HTML will depends on the element given - here, an id selected div called "map"; the second argument of setView is the zoom level

    // Add a tile to the map = a background. Comes from OpenStreetmap
    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map); // the style of the map can be changed

    // Add a svg layer to the map
    L.svg().addTo(map);

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

    // If the user change the map (zoom or drag), I update circle position:
    map.on("moveend", update);
  }
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
});


