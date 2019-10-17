import React from "react";
import axios from "axios";
import BirdMap from "./bird.map";
import * as config from "../../config";
import Search from "../search/search";
import { getBirds } from "../../services/birds.service";
import Typed from "react-typed";
import Select from "react-select";
import { DatePicker } from "antd";
import AlertComponent from "../shared/alerts";

const { RangePicker } = DatePicker;

const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

class BirdContainer extends React.Component {
  constructor(props) {
    super(props);
    const alertComp = new AlertComponent();
    const priorYear = new Date();
    priorYear.setFullYear(new Date().getUTCFullYear() - 1);
    alertComp.setFailure("Invalid Query", "Date range is invalid!");
    this.state = {
      selectedBirds: [],
      birds: [],
      dateRange: {
        from: priorYear,
        to: new Date()
      },
      alertComp: alertComp,
      prevFailure: false
    };
    this.changeBirds = this.changeBirds.bind(this);
    this.changeDates = this.changeDates.bind(this);
  }

  componentDidMount() {
    getBirds((err, res) => {
      if (err) throw err;
      this.setState({
        birds: res.map(b => {
          return { value: b.id, label: b.bird_name };
        })
      });
    });
  }

  changeDates(dates) {
    console.log(dates);
    if (dates.length == 2) {
      const curDate = new Date().setHours(0, 0, 0, 0);
      const dateOne = dates[0]._d.setHours(0, 0, 0, 0);
      const dateTwo = dates[1]._d.setHours(0, 0, 0, 0);
      if (dateOne > curDate || dateTwo > curDate || dateTwo < dateOne) {
        this.setState({ prevFailure: true });
      } else {
        this.setState({
          prevFailure: false,
          dateRange: {
            from: dateOne,
            to: dateTwo
          }
        });
      }
    }
  }

  /**
   * Handle bird change event from the searchbar.
   * @param selectedBirds The array of selected birds.
   */
  changeBirds(selectedBirds) {
    this.setState({ selectedBirds: selectedBirds || [] });
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
        <div style={{ marginBottom: "5%" }}>
          {this.state.prevFailure ? this.state.alertComp.component : null}
        </div>
        <h1 style={{ marginLeft: "40%" }}>
          <Typed
            typedRef={typed => {
              this.typed = typed;
            }}
            strings={["Observatory"]}
            typeSpeed={65}
          />
        </h1>
        <div className="container">
          <div
            style={{
              margin: "10% 6%",
              marginTop: 25,
              marginBottom: 25,
              display: "flex",
              flexWrap: "wrap"
            }}
          >
            <div style={{ width: "65%", marginRight: "3%" }}>
              <Select
                styles={selectStyles}
                options={this.state.birds}
                isMulti
                onChange={this.changeBirds}
              />
            </div>
            <div style={{ width: "30%" }}>
              <RangePicker size="large" onChange={this.changeDates} />
            </div>
          </div>
        </div>
        <BirdMap
          birds={this.state.selectedBirds}
          dateRange={this.state.dateRange}
        />
      </div>
    );
  }
}

export default BirdContainer;
