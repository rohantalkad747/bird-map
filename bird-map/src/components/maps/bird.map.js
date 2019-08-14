import React from "react";
import * as L from "leaflet/dist/leaflet";
import axios from "axios";
import * as config from "../../config";
import BaseMap from "../maps/base.map";

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


class BirdMap extends BaseMap {
  constructor(props) {
    super(props);
    this.state = { birdIdentifiers: props.birds.map(b => b.id) };
  }

  setBirds() {
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

  addBirdCoordinates() {
    axios
      .post(config.serverName + "/api/birds/all-coordinates", {
        birdIds: this.state.birdIdentifiers
      })
      .then(res => {
        this.setState({
          birdIdentifiers: this.state.birdIdentifiers,
          birdCoordinates: res.data
        });
        this.addBirdsToMap();
      })
      .catch(err => console.log(err));
  }

  addBirdsToMap() {
    const markers = [];
    for (const bird of this.state.birdCoordinates) {
      const marker = L.marker([bird.lat, bird.lng], { icon: this.ico });
      marker.bindPopup(card(bird));
      markers.push(marker);
    }
    if (this.birdLayer) this.birdLayer.remove();
    this.birdLayer = L.layerGroup(markers);
    this.birdLayer.addTo(this.map);
  }
}

export default BirdMap;
