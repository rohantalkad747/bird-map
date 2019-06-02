import React from "react"
import * as L from "leaflet/dist/leaflet"

const card = type => {
  return `<div className="card">
        <div className="card-header">
            Bird Spotted on Ground
        </div>
        <div className="card-body">
            <h5 className="card-title">${type}</h5>
            <p className="card-text">Spotted on August 5th 2018.</p>
        </div>
    </div>`
}

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.birds = props.birds
    this.addTiles = this.addTiles.bind(this)
    this.getTileLayer = this.getTileLayer.bind(this)
  }

  componentDidMount() {
    this.map = L.map("mapid").setView([51.5, -0.09], 13)
    navigator.geolocation.getCurrentPosition(pos => {
      this.map.panTo([pos.coords.latitude, pos.coords.longitude])
    })
    this.addTiles()
  }

  addTiles() {
    const satellite = this.getTileLayer("mapbox.satellite")
    const run = this.getTileLayer("mapbox.run-bike-hike")
    const outdoors = this.getTileLayer("mapbox.outdoors")
    const baseLayers = {
      Satellite: satellite,
      Hiker: run,
      Street: outdoors,
    }
    // Testing stuff
    let ico = L.icon({
      iconUrl: "http://www.clker.com/cliparts/u/V/6/f/G/9/red-raven-hi.png",
      iconSize: [24, 28],
    })
    let marker = L.marker([51.5, -0.09], { icon: ico })
    marker.bindPopup(card("Raven"))

    let markerTwo = L.marker([51.5, -2], { icon: ico })
    markerTwo.bindPopup(card("Hawk"))

    const birdLayer = L.layerGroup([marker, markerTwo])
    // testing Over
    const overlayMaps = { Birds: birdLayer, Nests: L.layerGroup([]) }
    run.addTo(this.map)
    birdLayer.addTo(this.map)
    L.control.layers(baseLayers, overlayMaps).addTo(this.map)
  }

  getTileLayer(type) {
    return L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution: "OpenStreet Maps",
        maxZoom: 18,
        id: type,
        accessToken:
          "pk.eyJ1IjoicnRhbGthZCIsImEiOiJjanc3YTU5amkyYzRpNDlxa3B3dmQwZW51In0.nLoVD83IzK60UcH8NkveXA",
      },
    )
  }

  render() {
    return (
      <div className="container">
        <div
          id="mapid"
          style={{
            height: 500,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        />
      </div>
    )
  }
}

export default Map
