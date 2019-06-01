import React from "react"
import * as L from "leaflet/dist/leaflet"
import axios from "axios";
import * as config from "../../../config";


class BirdMap extends React.Component {
  constructor(props) {
    super(props);
    this.addTiles = this.addTiles.bind(this);
    this.getBirds = this.getBirds.bind(this);
  }

  componentDidMount() {
      this.getBirds((err, res) => {
          // show error alert
          if (err) throw err;
          this.birds = res;
          this.setState({curBirds: null});
      });
    this.map = L.map("mapid").setView([40, 73], 13)
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.map.panTo([pos.coords.latitude, pos.coords.longitude])
        this.addTiles()
      },
      err => {
        this.map.panTo([43, 73])
        this.addTiles()
      },
    )
  }

  addBird(bird) {
      let birds = this.state.curBirds;
      birds.push(bird);
      this.setState({curBirds: birds});
  }

  removeBird(bird) {
      let birds = this.state.curBirds;
      const newBird = birds.filter(b => b.birdName !== bird.name);
      this.setState({curBirds: birds});
  }

  getBirds(callback) {
      axios.get(`${config.serverName}/birds`)
          .then(res => callback(null, res.data))
          .catch(err => callback(err, null));
    }

  addTiles() {
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoicnRhbGthZCIsImEiOiJjanc3YTU5amkyYzRpNDlxa3B3dmQwZW51In0.nLoVD83IzK60UcH8NkveXA",
      },
    ).addTo(this.map)
  }

  render() {
    return (
      <div className="container">
          <h4 class="lead"> BirdMap </h4>
        <div id="mapid" style={{ height: 500 }} />
      </div>
    )
  }
}

export default BirdMap
