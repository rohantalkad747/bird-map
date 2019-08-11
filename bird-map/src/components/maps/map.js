import React from "react";
import * as L from "leaflet/dist/leaflet";
import axios from "axios";
import * as config from "../../config";

const card = bird => {
  return `<div className="card">
        <div className="card-header">
            <b> Bird: </b> ${bird.bird_name}
        </div>
        <div className="card-body">
            <h5 className="card-title">${bird.descr}</h5>
            <p className="card-text">Spotted on ${new Date(
              bird.date_taken
            ).toDateString()}</p>
        </div>
    </div>`;
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { birdIdentifiers: props.birds.map(b => b.id) };
    this.setBaseLayers = this.setBaseLayers.bind(this);
    this.ico = L.icon({
      iconUrl: "http://www.clker.com/cliparts/u/V/6/f/G/9/red-raven-hi.png",
      iconSize: [24, 28]
    });
  }

  setBirds() {
    console.log("setting after update");
    this.addBirdCoordinates();
  }

  shouldComponentUpdate(nextProps) {
    return this.state.birdIdentifiers !== nextProps.birdIdentifiers;
  }

  componentWillReceiveProps(props) {
    this.setState({ birdIdentifiers: props.birds.map(b => b.id) }, () => {
      this.setBirds();
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

  addBirdsToMap() {
    const markers = [];
    for (const bird of this.state.birdCoordinates) {
      console.log(bird);
      const marker = L.marker([bird.lat, bird.lng], { icon: this.ico });
      marker.bindPopup(card(bird));
      markers.push(marker);
    }
    if (this.birdLayer) this.birdLayer.remove();
    this.birdLayer = L.layerGroup(markers);
    // this.nestLayer = L.layerGroup(nestLayers);
    this.birdLayer.addTo(this.map);
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

export default Map;
