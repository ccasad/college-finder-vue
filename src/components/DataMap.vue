<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script lang="ts">
import mapboxgl from "mapbox-gl";
import { difference, featureCollection, bbox } from "@turf/turf";

import { defineComponent, onMounted } from "vue";

import { upperCaseFirstLetter } from "@/common/utilities";

export default defineComponent({
  name: "DataMap",
  setup() {
    let map:any;
    let colleges:any;
    // let hour1:any;
    // let hour2:any;
    // let hour3:any;
    // let hour4:any;
    // let hour5:any;

    mapboxgl.accessToken =
      "pk.eyJ1IjoiY2Nhc2FkIiwiYSI6ImNqN3BpNnByZTN1bjkycW5wZXMyYzU0bHEifQ.__Gj3_aFbIH7Uo8YlmHLJQ";

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    const initMap = () => {
      map = new mapboxgl.Map({
        container: "map",
        center: [-77.266433, 35.799289],
        zoom: 9,
        hash: true,
        style: "mapbox://styles/mapbox/streets-v9"
      });

      map.on("load", function () {
        // map.addSource("hour1", { type: "geojson", data: hour1 });
        // map.addSource("hour2", { type: "geojson", data: hour2 });
        // map.addSource("hour3", { type: "geojson", data: hour3 });
        // map.addSource("hour4", { type: "geojson", data: hour4 });
        // map.addSource("hour5", { type: "geojson", data: hour5 });

        // map.addLayer({
        //   id: "hour5",
        //   type: "fill",
        //   source: "hour5",
        //   paint: { "fill-color": "purple", "fill-opacity": 0.2 }
        // });
        // map.addLayer({
        //   id: "hour4",
        //   type: "fill",
        //   source: "hour4",
        //   paint: { "fill-color": "red", "fill-opacity": 0.2 }
        // });
        // map.addLayer({
        //   id: "hour3",
        //   type: "fill",
        //   source: "hour3",
        //   paint: { "fill-color": "orange", "fill-opacity": 0.2 }
        // });
        // map.addLayer({
        //   id: "hour2",
        //   type: "fill",
        //   source: "hour2",
        //   paint: { "fill-color": "yellow", "fill-opacity": 0.2 }
        // });
        // map.addLayer({
        //   id: "hour1",
        //   type: "fill",
        //   source: "hour1",
        //   paint: { "fill-color": "green", "fill-opacity": 0.2 }
        // });

        map.addSource("colleges", { type: "geojson", data: colleges });

        map.addLayer({
          id: "colleges",
          type: "circle",
          source: "colleges",
          paint: {
            "circle-radius": 4,
            "circle-color": [
              "match",
              ["get", "ncaa_division"],
              1,
              "#00ff00", // green
              2,
              "#0000ff", // blue
              3,
              "#ff0000", // red
              "#000000" // black
            ]
          }
        });
      });

      map.on("mouseenter", "colleges", (e:any) => {
        map.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const name = e.features[0].properties.ncaa_name;
        const division = `NCAA Division ${e.features[0].properties.ncaa_division}`;
        const location = `${upperCaseFirstLetter(e.features[0].properties.address_city)}, ${upperCaseFirstLetter(e.features[0].properties.address_state)}`;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        const html = `<div class="map-popup-content" style="color:black;"><b>${name}</b><br>${division}<br>${location}</div>`;
        popup.setLngLat(coordinates).setHTML(html).addTo(map);
      });

      map.on("mouseleave", "colleges", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });

      const bounds = bbox(colleges);
      map.fitBounds(bounds, {
        padding: 20
      });
    };

    const getData = async () => {
      let result = await fetch("/assets/data/colleges_matched.geojson");
      colleges = await result.json();

      // result = await fetch("/assets/data/hour-1-distance.geojson");
      // hour1 = await result.json();
      // result = await fetch("/assets/data/hour-2-distance.geojson");
      // hour2 = await result.json();
      // result = await fetch("/assets/data/hour-3-distance.geojson");
      // hour3 = await result.json();
      // result = await fetch("/assets/data/hour-4-distance.geojson");
      // hour4 = await result.json();
      // result = await fetch("/assets/data/hour-5-distance.geojson");
      // hour5 = await result.json();

      // // cutout just the polygon ring for that hour
      // const hour2Diff:any = difference(hour2.features[0], hour1.features[0]);
      // const hour3Diff:any= difference(hour3.features[0], hour2.features[0]);
      // const hour4Diff:any = difference(hour4.features[0], hour3.features[0]);
      // const hour5Diff:any = difference(hour5.features[0], hour4.features[0]);

      // hour2 = featureCollection([hour2Diff]);
      // hour3 = featureCollection([hour3Diff]);
      // hour4 = featureCollection([hour4Diff]);
      // hour5 = featureCollection([hour5Diff]);
    };

    onMounted(async () => {
      await getData();
      initMap();
    });
  },
});
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>