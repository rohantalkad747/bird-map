import React from "react";
import * as L from "leaflet/dist/leaflet";
import axios from "axios";
import * as config from "../../config";

class BaseMap extends React.Component {
  constructor(props) {
    super(props);
    this.setBaseLayers = this.setBaseLayers.bind(this);
    this.ico = L.icon({
      iconUrl: "https://cdn0.iconfinder.com/data/icons/birds-colored/48/Animals_Birds_Artboard_14-512.png",
      iconSize: [44, 52]
    });
  }

  componentDidMount() {
    this.addMap();
    this.setBaseLayers();
  }

  addBirdCoordinates() {
    axios
      .post(config.serverName + "/api/birds/all-coordinates", {
        birdIds: this.state.birdIdentifiers
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          birdIdentifiers: this.state.birdIdentifiers,
          birdCoordinates: res.data
        });
        this.addBirdsToMap();
      })
      .catch(err => console.log(err));
  }

  addMap() {
    this.map = L.map("mapid").setView([51.5, -0.09], 13);
    navigator.geolocation.getCurrentPosition(pos => {
      this.map.panTo([pos.coords.latitude, pos.coords.longitude]);
    });
  }

  setBaseLayers() {
    const satellite = this.getTileLayer("mapbox.satellite");
    const run = this.getTileLayer("mapbox.run-bike-hike");
    const outdoors = this.getTileLayer("mapbox.outdoors");
    this.baseLayers = {
      Satellite: satellite,
      Hiker: run,
      Street: outdoors
    };
    run.addTo(this.map); // Default base layer
    L.control.layers(this.baseLayers).addTo(this.map);
  }

  getTileLayer(type) {
    return L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution: "OpenStreet Maps",
        maxZoom: 18,
        id: type,
        accessToken:
          "pk.eyJ1IjoicnRhbGthZCIsImEiOiJjanc3YTU5amkyYzRpNDlxa3B3dmQwZW51In0.nLoVD83IzK60UcH8NkveXA"
      }
    );
  }

  render() {
    return (
      <div className="container">
        <div
          id="mapid"
          style={{
            height: 500,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        />
      </div>
    );
  }
}

export default BaseMap;
