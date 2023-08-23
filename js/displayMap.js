navigator.geolocation &&
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const positionUrl = `'https://www.google.com/maps/@${latitude},${longitude}`;

      const coordonnees = [latitude, longitude];

      var map = L.map("map").setView(coordonnees, 1); //position of the element in the HTML will depends on the element given - here, an id selected div called "map"; the second argument of setView is the zoom level

      L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map); // the stle of the map can be changed

      L.marker(coordonnees)
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    },
    function () {
      "Not found.";
    }
    );