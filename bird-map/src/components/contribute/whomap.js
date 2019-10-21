import React from "react";
import BaseMap from "../maps/base.map";
import * as L from "leaflet/dist/leaflet";

class WhoMap extends BaseMap {
  constructor(props) {
    super(props);
    console.log(props)
    this.marker = null;
  }

  componentDidMount() {
    super.componentDidMount();
    this.listenForClick();
  }

  render() {
    if (this.props.lat != null && this.props.lng != null && this.map) {
      if (this.marker) this.marker.remove();
      this.marker = L.marker([this.props.lat, this.props.lng], { icon: this.ico });
      this.marker.addTo(this.map);
      this.map.panTo([this.props.lat, this.props.lng]);
    }
    return super.render();
  }


  listenForClick() {
    this.map.on("click", e => {
      this.props.addLocation(e.latlng.lat, e.latlng.lng);
      if (this.marker) this.marker.remove();
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], { icon: this.ico });
      this.marker.addTo(this.map);
      this.map.panTo([e.latlng.lat, e.latlng.lng]);
    });
  }
  
}

export default WhoMap;
