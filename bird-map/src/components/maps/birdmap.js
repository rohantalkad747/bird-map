import React from 'react';
import * as L from 'leaflet/dist/leaflet';

const mapStyles = ({
    backgroundColor: 'blue'
});

class BirdMap extends React.Component {
    constructor(props) {
        super(props);
        this.addTiles = this.addTiles.bind(this);
    }
    
    componentDidMount() {
        this.map = L.map('mapid').setView([44, 80], 13);
        navigator.geolocation.getCurrentPosition(((pos) => {
            this.map.panTo([pos.coords.latitude, pos.coords.longitude]);
            this.addTiles();
        }),
        ((err) => {
            this.map.panTo([43, -50]);
            this.addTiles();
        })
        );
    }

    addTiles() {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoicnRhbGthZCIsImEiOiJjanc3YTU5amkyYzRpNDlxa3B3dmQwZW51In0.nLoVD83IzK60UcH8NkveXA'
            }).addTo(this.map);
    }

    render () {
        return (
            <div className="container">
                <div id="mapid" style={{height: 500}}>
                </div>
            </div>
        );
    }
}

export default BirdMap;
