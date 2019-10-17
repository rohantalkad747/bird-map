import React from "react";
import BaseMap from "../maps/base.map";
import * as L from "leaflet/dist/leaflet";

class WhoMap extends BaseMap {
  constructor(props) {
    super(props);
    this.marker = null;
  }

  componentDidMount() {
    super.componentDidMount();
    this.listenForClick();
  }

  listenForClick() {
    this.map.on("click", e => {
      this.props.addLocation(e.latlng.lat, e.latlng.lng);
      if (this.marker) this.marker.remove();
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.ico });
      this.marker.addTo(this.map);
    });
  }
}

export default WhoMap;
