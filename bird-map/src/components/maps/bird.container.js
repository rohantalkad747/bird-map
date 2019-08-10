import React from "react";
import axios from "axios";
import Map from "./map";
import * as config from "../../config";
import Search from "../search/search";

class BirdMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedBirds: [],
                   birds: []
    };
    this.changeBirds = this.changeBirds.bind(this);
  }

  componentDidMount() {
    this.getBirds((err, res) => {
      if (err) throw err;
      this.setState({selectedBirds: [], birds: res});
    });
  }

  /**
   * Handle bird change event from the searchbar.
   * @param selectedBirds The array of selected birds.
   */
  changeBirds(selectedBirds) {
    console.log(selectedBirds);
    this.setState({ selectedBirds: selectedBirds, birds: this.state.birds });
  }

  /**
   * Returns an array of birds from the database.
   */
  getBirds(callback) {
    axios
      .get(`${config.serverName}/api/birds/all-birds`)
      .then(res => callback(null, res.data))
      .catch(err => callback(err, null));
  }

  render() {
    return (
      <div
        className="birds"
        style={{
          marginTop: 25,
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 50
        }}
      >
        <h4 className="lead" style={{ marginLeft: "35%" }}>
          {" "}
          FIND YOUR FAVORITE BIRDS!{" "}
        </h4>
        <div
          className="container"
          style={{ width: "50%", marginTop: 25, marginBottom: 25 }}
        >
          <Search options={this.state.birds} handleChange={this.changeBirds} />
        </div>
        <Map birds={this.state.selectedBirds} />
      </div>
    );
  }
}

export default BirdMap;
