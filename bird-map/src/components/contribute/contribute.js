import React from "react";
import WhoMap from "./who.map";
import { getBirds } from "../../services/birds.service";
import Select from "react-select";
import axios from "axios";
import { serverName } from "../../config";
import {
  Typography,
  Steps,
  InputNumber,
  Divider,
  Input,
  DatePicker,
} from "antd";
import Typed from "react-typed";
import moment from "moment";
import BirdMap from "../maps/bird.container";
import AlertComponent from "../shared/alerts";
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;

const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const selectStyles = { menu: styles => ({ ...styles, zIndex: 999 }) };

class ContributeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      birds: [],
      birdId: null,
      numb: 1,
      descr: "",
      alertComp: new AlertComponent(),
      dateTaken: new Date(),
      submitting: false
    };
    this.addBird = this.addBird.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.addDescription = this.addDescription.bind(this);
    this.addDate = this.addDate.bind(this);
    this.getCurDate = this.getCurDate.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getBirds((err, birds) => {
      if (err) throw err;
      this.setState({ birds: birds.map(b => { return {value: b.id, label: b.bird_name}}) });
    });
  }

  getCurDate() {
    const curDate = new Date();
    return `${curDate.getDate()}/${curDate.getMonth() + 1}/${curDate.getFullYear()}`;
  }

  addQuantity(quant) {
    this.setState({ quantity: Math.floor(quant) });
  }

  addBird(bird) {
    this.setState({ birdId: bird.value });
  }

  addDescription(e) {
    this.setState({ descr: e.target.value });
  }

  addDate(date) {
    this.setState({ dateTaken: new Date(date._d) });
  }

  addLocation(lat, lng) {
    this.setState({ lat: lat, lng: lng });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.submitting) {
      this.setState({submitting: true});
      const { birds, step, submitting, ...rest } = this.state;
      if (!rest.birdId || !rest.numb || !rest.dateTaken || rest.lat == undefined || rest.lng == undefined) {
        console.log(this.state);
        window.scroll(0, 0);
        this.state.alertComp.setFailure("Failure!", "Some fields need to be completed!");
        this.setState({alertComp: this.state.alertComp, submitting: false});
        return;
      }
      if (rest.dateTaken.getTime() > new Date().getTime()) {
        window.scroll(0, 0);
        this.state.alertComp.setFailure("Failure!", "Date must be prior to current day!");
        this.setState({alertComp: this.state.alertComp, submitting: false});
        return;
      }
      axios
          .post(`${serverName}/api/birds/add-coordinate`, {bird: rest})
          .then(res => {
            window.scroll(0, 0);
            this.state.alertComp.setSuccess("Success!", "Successfully submitted data!");
            this.setState({alertComp: this.state.alertComp, submitting: false});
          })
          .catch(err => {console.log(err.response);
            window.scroll(0, 0);
            this.state.alertComp.setFailure("Failure!", err.response.data);
            this.setState({alertComp: this.state.alertComp, submitting: false});
          });
    }
  }
  render() {
    return (
      <div
        className="contribute"
        style={{
          marginTop: 25,
          marginLeft: 30,
          marginRight: 30,
          marginBottom: 50
        }}
      >
        <div>
          <h1 style={{ marginLeft: "40%" }}>
            <Typed
              typedRef={typed => {
                this.typed = typed;
              }}
              strings={["Contribute"]}
              typeSpeed={65}
            />
          </h1>
          { this.state.alertComp.component }
          <Divider>
            <h4 className="lead" style={{ marginTop: 20, marginBottom: 15 }}>
              What was the date of the encounter?
              <span style={{color: "red"}}> *</span>
            </h4>
          </Divider>
          <div
            className="container"
            style={{ textAlign: "center", marginBottom: 30 }}>
            <DatePicker
              defaultValue={moment(this.getCurDate(), dateFormatList[0])}
              format={dateFormatList}
              onChange={this.addDate}
            />
          </div>
          <Divider>
            <h4 className="lead">Which species did you identify? <span style={{color: "red"}}> *</span></h4>
          </Divider>
          <div className="container" style={{ width: "25%", marginBottom: 20 }}>
            <Select styles={selectStyles} options={this.state.birds} onChange={this.addBird}/>
          </div>
          <Divider>
            <h4 className="lead" style={{ marginTop: 20, marginBottom: 15 }}>
              How many did you witness? <span style={{color: "red"}}> *</span>
            </h4>
          </Divider>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <InputNumber min={1} defaultValue={1} onChange={this.addQuantity} />
          </div>
          <Divider>
            <h4 className="lead" style={{ marginTop: 20, marginBottom: 20 }}>
              Where was the encounter? <span style={{color: "red"}}> *</span>
            </h4>
          </Divider>

          <WhoMap addLocation={this.addLocation}/>
          <Divider>
            <h4 className="lead" style={{ marginTop: 20, marginBottom: 15 }}>
              Provide a short description.
            </h4>
          </Divider>
          <div className="container" style={{ textAlign: "center" }}>
            <TextArea
              rows={4}
              style={{ width: "50%" }}
              onChange={this.addDescription}
            />
          </div>
          <div
            style={{ textAlign: "center", marginTop: "5%", marginBottom: "5%" }}
          >
            <button
              type="submit"
              onClick={this.handleSubmit}
              className="search-box"
              id="search-box"
              style={{
                backgroundColor: "black",
                width: 120
              }}>
              <div style={{ color: "white" }}>Submit </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContributeComponent;
