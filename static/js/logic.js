console.log("working");

// Creating the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: "pk.eyJ1IjoiYm1yMjA5IiwiYSI6ImNsNWtjb3ZmNzAxdWYzY21seTA5bmhrcXQifQ.kv253MyIYHsgmvGPy3Pz_w"
});

// Creating the satellite view tile layer that will be an option for the map.
let nightNavigation = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: "pk.eyJ1IjoiYm1yMjA5IiwiYSI6ImNsNWtjb3ZmNzAxdWYzY21seTA5bmhrcXQifQ.kv253MyIYHsgmvGPy3Pz_w"
});

// Creating a base layer that holds both maps.
let baseMaps = {
    Streets: streets,
    "Night Navigation": nightNavigation
};

// Creating the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [37.6872, -97.3301],
    zoom: 5,
    layers: [nightNavigation]
});

// Adding layer groups to the map data
let nov20Pollution = new L.LayerGroup();
let feb21Pollution = new L.LayerGroup();
let may21Pollution = new L.LayerGroup();
let aug21Pollution = new L.LayerGroup();
let nov21Pollution = new L.LayerGroup();
let feb22Pollution = new L.LayerGroup();
let may22Pollution = new L.LayerGroup();

// Adding a reference to the overlays object.
let overlays = {
  "November 27, 2020": nov20Pollution,
  "February 27, 2021": feb21Pollution,
  "May 27, 2021": may21Pollution,
  "August 27, 2021": aug21Pollution,
  "November 27, 2021": nov21Pollution,
  "February 27, 2022": feb22Pollution,
  "May 27, 2022": may22Pollution
};

// Adding a control to the map to allow user to select map
var layerControl = L.control.layers(baseMaps, overlays).addTo(map);

// Cities chosen for the pollution data 
let cities = [{
    location: [34.0522, -118.2437],
    lat: 34.0522,
    lon: -118.2437,
    city: "Los Angeles", 
    state: "CA"
  },
  {
    location: [37.7749, -122.4194],
    lat: 37.7749,
    lon: -122.4194,
    city: "San Francisco",
    state: "CA" 
  },
  {
    location: [47.6062, -122.3321],
    lat: 47.6062,
    lon: -122.3321,
    city: "Seattle",
    state: "WA" 
  },
  {
    location: [39.1067, -94.6764],
    lat: 39.106667,
    lon: -94.676392,
    city: "Kansas City",
    state: "KS"
  },
  {
    location: [32.7767, -96.797],
    lat: 32.7767,
    lon: -96.7970,
    city: "Dallas",
    state: "TX" 
  },
  {
    location: [29.7604, -95.3698],
    lat: 29.7604,
    lon: -95.3698, 
    city: "Houston",
    state: "TX"
  },
  {
    location: [33.749, -84.388],
    lat: 33.7490,
    lon: -84.3880,
    city: "Atlanta",
    state: "GA"
  },
  {
    location: [25.7617, -80.1918],
    lat: 25.7617,
    lon: -80.1918,
    city: "Miami",
    state: "FL"
  },
  {
    location: [39.9526, -75.1652],
    lat: 39.9526,
    lon: -75.1652,
    city: "Philadelphia",
    state: "PA"
  },
  {
    location: [40.7128, -74.006],
    lat: 40.7128,
    lon: -74.0060,
    city: "New York",
    state: "NY"
  },
  {
    location: [42.3601, -71.0589],
    lat: 42.3601,
    lon: -71.0589,
    city: "Boston",
    state: "MA"
  }];

// Adding November 27, 2020 json data
d3.json("https://raw.githubusercontent.com/bmr209/PollutionSight/brian_rincon/pollution_json_files/api_nov_27_2020.json")
  .then (function(data) {        
      for (let i = 0; i < 11; i++) {

        for (let j = 0; j < 11; j++) {

          // Creating a function to color the circle markers based on the CAQI value
          function getColor(aqi){
            if (data[i].list[4].main.aqi === 1){
              return "#3cb371";
            }
            if (data[i].list[4].main.aqi === 2){
                return "#00ff00";
            }
            if (data[i].list[4].main.aqi === 3){
                return "#ffff00";
            }
            if (data[i].list[4].main.aqi === 4){
                return "#ffa500";
            }
            else
                return "#ff0000";
          }

          // Adding circle markers containing the pollution data
          L.circleMarker([data[i].coord.lat, data[i].coord.lon], {
          
            fillColor: getColor(data[i].list[4].main.aqi),
            color: getColor(data[i].list[4].main.aqi)

          })
          .bindPopup("<h2>" + data[11].city[i] + ", " + data[11].state[i] + "<hr> CAQI: " + data[i].list[4].main.aqi + " </h2> <hr> In μg/m3: <h3> CO: " + data[i].list[4].components.co + "<hr> NO: " + data[i].list[4].components.no + "<hr> O3: " + data[i].list[4].components.o3 + "<hr> SO2: " + data[i].list[4].components.so2 + "</h3>")
          .addTo(nov20Pollution);
        }
      };
      nov20Pollution.addTo(map)
});

// Adding February 27, 2021 json data
d3.json("https://raw.githubusercontent.com/bmr209/PollutionSight/brian_rincon/pollution_json_files/api_feb_27_2021.json")
  .then (function(data) {
      for (let i = 0; i < 11; i++) {

        for (let j = 0; j < 11; j++) {
          
          // Creating a function to color the circle markers based on the CAQI value
          function getColor(aqi){
            if (data[i].list[4].main.aqi === 1){
              return "#3cb371";
            }
            if (data[i].list[4].main.aqi === 2){
                return "#00ff00";
            }
            if (data[i].list[4].main.aqi === 3){
                return "#ffff00";
            }
            if (data[i].list[4].main.aqi === 4){
                return "#ffa500";
            }
            else
                return "#ff0000";
          }
          
          // Adding circle markers containing the pollution data
          L.circleMarker([data[i].coord.lat, data[i].coord.lon], {
          
            fillColor: getColor(data[i].list[4].main.aqi),
            color: getColor(data[i].list[4].main.aqi)

          })
          .bindPopup("<h2>" + data[11].city[i] + ", " + data[11].state[i] + "<hr> CAQI: " + data[i].list[4].main.aqi + " </h2> <hr> In μg/m3: <h3> CO: " + data[i].list[4].components.co + "<hr> NO: " + data[i].list[4].components.no + "<hr> O3: " + data[i].list[4].components.o3 + "<hr> SO2: " + data[i].list[4].components.so2 + "</h3>")
          .addTo(feb21Pollution);
        };
      };
      feb21Pollution.addTo(map)
});

// Creating legend control object
let legend = L.control({
  position: "bottomright"
});

// Adding the details for the legend
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
    labels = ['<strong>Air Quality</strong>'];

  const caqi = ["1: Very Good", "2: Good", "3: Moderate", "4: Unhealthy", "5: Very Unhealthy"];
  const colors = [
    "#3cb371",
    "#00ff00",
    "#ffff00",
    "#ffa500",
    "#ff0000"
  ];

  // Generating label and a colored square for each interval
  for (var i = 0; i < caqi.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " + caqi[i] + "<br>";
  }
  return div;
};

// Adding legend to the map
legend.addTo(map);

// Adding May 27, 2021 json data
d3.json("https://raw.githubusercontent.com/bmr209/PollutionSight/brian_rincon/pollution_json_files/api_may_27_2021.json")
  .then (function(data) {
      for (let i = 0; i < 11; i++) {

        for (let j = 0; j < 11; j++) {

          // Creating a function to color the circle markers based on the CAQI value
          function getColor(aqi){
            if (data[i].list[4].main.aqi === 1){
              return "#3cb371";
            }
            if (data[i].list[4].main.aqi === 2){
                return "#00ff00";
            }
            if (data[i].list[4].main.aqi === 3){
                return "#ffff00";
            }
            if (data[i].list[4].main.aqi === 4){
                return "#ffa500";
            }
            else
                return "#ff0000";
          }

          // Adding circle markers containing the pollution data
          L.circleMarker([data[i].coord.lat, data[i].coord.lon], {
          
            fillColor: getColor(data[i].list[4].main.aqi),
            color: getColor(data[i].list[4].main.aqi)

          })
          .bindPopup("<h2>" + data[11].city[i] + ", " + data[11].state[i] + "<hr> CAQI: " + data[i].list[4].main.aqi + " </h2> <hr> In μg/m3: <h3> CO: " + data[i].list[4].components.co + "<hr> NO: " + data[i].list[4].components.no + "<hr> O3: " + data[i].list[4].components.o3 + "<hr> SO2: " + data[i].list[4].components.so2 + "</h3>")
          .addTo(may21Pollution);
        };
      };
      may21Pollution.addTo(map)
});

// Adding August 27, 2021 json data
d3.json("https://raw.githubusercontent.com/bmr209/PollutionSight/brian_rincon/pollution_json_files/api_aug_27_2021.json")
  .then (function(data) {
      for (let i = 0; i < 11; i++) {

        for (let j = 0; j < 11; j++) {

          // Creating a function to color the circle markers based on the CAQI value
          function getColor(aqi){
            if (data[i].list[4].main.aqi === 1){
              return "#3cb371";
            }
            if (data[i].list[4].main.aqi === 2){
                return "#00ff00";
            }
            if (data[i].list[4].main.aqi === 3){
                return "#ffff00";
            }
            if (data[i].list[4].main.aqi === 4){
                return "#ffa500";
            }
            else
                return "#ff0000";
          }

          // Adding circle markers containing the pollution data
          L.circleMarker([data[i].coord.lat, data[i].coord.lon], {
          
            fillColor: getColor(data[i].list[4].main.aqi),
            color: getColor(data[i].list[4].main.aqi)

          })
          .bindPopup("<h2>" + data[11].city[i] + ", " + data[11].state[i] + "<hr> CAQI: " + data[i].list[4].main.aqi + " </h2> <hr> In μg/m3: <h3> CO: " + data[i].list[4].components.co + "<hr> NO: " + data[i].list[4].components.no + "<hr> O3: " + data[i].list[4].components.o3 + "<hr> SO2: " + data[i].list[4].components.so2 + "</h3>")
          .addTo(aug21Pollution);
        };
      };
      aug21Pollution.addTo(map)
});

// Adding November 27, 2021 json data
d3.json("https://raw.githubusercontent.com/bmr209/PollutionSight/brian_rincon/pollution_json_files/api_nov_27_2021.json")
  .then (function(data) {
      for (let i = 0; i < 11; i++) {

        for (let j = 0; j < 11; j++) {

          // Creating a function to color the circle markers based on the CAQI value
          function getColor(aqi){
            if (data[i].list[4].main.aqi === 1){
              return "#3cb371";
            }
            if (data[i].list[4].main.aqi === 2){
                return "#00ff00";
            }
            if (data[i].list[4].main.aqi === 3){
                return "#ffff00";
            }
            if (data[i].list[4].main.aqi === 4){
                return "#ffa500";
            }
            else
                return "#ff0000";
          }

          // Adding circle markers containing the pollution data
          L.circleMarker([data[i].coord.lat, data[i].coord.lon], {
          
            fillColor: getColor(data[i].list[4].main.aqi),
            color: getColor(data[i].list[4].main.aqi)

          })
          .bindPopup("<h2>" + data[11].city[i] + ", " + data[11].state[i] + "<hr> CAQI: " + data[i].list[4].main.aqi + " </h2> <hr> In μg/m3: <h3> CO: " + data[i].list[4].components.co + "<hr> NO: " + data[i].list[4].components.no + "<hr> O3: " + data[i].list[4].components.o3 + "<hr> SO2: " + data[i].list[4].components.so2 + "</h3>")
          .addTo(nov21Pollution);
        };
      };
      nov21Pollution.addTo(map)
});

// Adding February 27, 2022 json data
d3.json("https://raw.githubusercontent.com/bmr209/PollutionSight/brian_rincon/pollution_json_files/api_feb_27_2022.json")
  .then (function(data) {
      for (let i = 0; i < 11; i++) {

        for (let j = 0; j < 11; j++) {

          // Creating a function to color the circle markers based on the CAQI value
          function getColor(aqi){
            if (data[i].list[4].main.aqi === 1){
              return "#3cb371";
            }
            if (data[i].list[4].main.aqi === 2){
                return "#00ff00";
            }
            if (data[i].list[4].main.aqi === 3){
                return "#ffff00";
            }
            if (data[i].list[4].main.aqi === 4){
                return "#ffa500";
            }
            else
                return "#ff0000";
          }

          // Adding circle markers containing the pollution data
          L.circleMarker([data[i].coord.lat, data[i].coord.lon], {
          
            fillColor: getColor(data[i].list[4].main.aqi),
            color: getColor(data[i].list[4].main.aqi)

          })
          .bindPopup("<h2>" + data[11].city[i] + ", " + data[11].state[i] + "<hr> CAQI: " + data[i].list[4].main.aqi + " </h2> <hr> In μg/m3: <h3> CO: " + data[i].list[4].components.co + "<hr> NO: " + data[i].list[4].components.no + "<hr> O3: " + data[i].list[4].components.o3 + "<hr> SO2: " + data[i].list[4].components.so2 + "</h3>")
          .addTo(feb22Pollution);
        };
      };
      feb22Pollution.addTo(map)
});

// Adding May 27, 2022 json data
d3.json("https://raw.githubusercontent.com/bmr209/PollutionSight/brian_rincon/pollution_json_files/api_may_27_2022.json")
  .then (function(data) {
      for (let i = 0; i < 11; i++) {

        for (let j = 0; j < 11; j++) {

          // Creating a function to color the circle markers based on the CAQI value
          function getColor(aqi){
            if (data[i].list[4].main.aqi === 1){
              return "#3cb371";
            }
            if (data[i].list[4].main.aqi === 2){
                return "#00ff00";
            }
            if (data[i].list[4].main.aqi === 3){
                return "#ffff00";
            }
            if (data[i].list[4].main.aqi === 4){
                return "#ffa500";
            }
            else
                return "#ff0000";
          }

          // Adding circle markers containing the pollution data
          L.circleMarker([data[i].coord.lat, data[i].coord.lon], {
          
            fillColor: getColor(data[i].list[4].main.aqi),
            color: getColor(data[i].list[4].main.aqi)

          })
          .bindPopup("<h2>" + data[11].city[i] + ", " + data[11].state[i] + "<hr> CAQI: " + data[i].list[4].main.aqi + " </h2> <hr> In μg/m3: <h3> CO: " + data[i].list[4].components.co + "<hr> NO: " + data[i].list[4].components.no + "<hr> O3: " + data[i].list[4].components.o3 + "<hr> SO2: " + data[i].list[4].components.so2 + "</h3>")
          .addTo(may22Pollution);
        };
      };
      may22Pollution.addTo(map)
});