import React from "react";
import axios from "axios";
import BirdMap from "./bird.map";
import * as config from "../../config";
import Search from "../search/search";
import {getBirds} from "../../services/birds.service";
import Typed from "react-typed";

class BirdContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedBirds: [],
                   birds: []
    };
    this.changeBirds = this.changeBirds.bind(this);
  }

  componentDidMount() {
    getBirds((err, res) => {
      if (err) throw err;
      this.setState({selectedBirds: [], birds: res});
    });
  }

  /**
   * Handle bird change event from the searchbar.
   * @param selectedBirds The array of selected birds.
   */
  changeBirds(selectedBirds) {
    this.setState({ selectedBirds: selectedBirds, birds: this.state.birds });
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
        <h1 style={{ marginLeft: "40%" }}>
          <Typed
              typedRef={typed => {
                this.typed = typed;
              }}
              strings={["Observatory"]}
              typeSpeed={65}
          />
        </h1>
        <div
          className="container"
          style={{ width: "70%", marginTop: 25, marginBottom: 25 }}
        >
          <Search options={this.state.birds} multiple={true} handleChange={this.changeBirds} />
        </div>
        <BirdMap birds={this.state.selectedBirds} />
      </div>
    );
  }
}

export default BirdContainer;
