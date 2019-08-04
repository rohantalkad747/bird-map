import React from "react";
import axios from "axios";
import Map from "./map";
import * as config from "../../config";
import Search from "../search/search";

class BirdMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { curBirds: [] };
    this.changeBirds = this.changeBirds.bind(this);
  }

  componentWillMount() {
    this.getBirds((err, res) => {
      if (err) throw err;
      console.log(res);
      this.birds = res;
    });
    this.birds = [
      { birdId: 1, birdName: "Robin" },
      { birdId: 2, birdName: "Crow" },
      { birdId: 3, birdName: "Sparrow" }
    ];
  }

  /**
   * @description Handle bird change event from the searchbar.
   * @param selectedBirds The array of selected birds.
   */
  changeBirds(selectedBirds) {
    this.setState({ curBirds: selectedBirds });
    console.log(selectedBirds);
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
          <Search options={this.birds} handleChange={this.changeBirds} />
        </div>
        <Map birds={this.state.curBirds} />
      </div>
    );
  }
}

export default BirdMap;
