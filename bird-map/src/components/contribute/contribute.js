import React from "react";
import WhoMap from "./who.map";
import { getBirds } from "../../services/birds.service";
import Search from "../search/search";
import axios from "axios";
import { serverName } from "../../config";
import {
  Typography,
  Steps,
  InputNumber,
  Divider,
  Input,
  DatePicker
} from "antd";
import Typed from "react-typed";
import moment from "moment";
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;

const dateFormat = "YYYY/MM/DD";
const monthFormat = "YYYY/MM";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

class ContributeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      birds: [],
      birdId: null,
      numb: 1,
      descr: "",
      dateTaken: null
    };
    this.addBird = this.addBird.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.addBird = this.addBird.bind(this);
    this.addDescription = this.addDescription.bind(this);
    this.addDate = this.addDate.bind(this);
    this.getCurDate = this.getCurDate.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    getBirds((err, birds) => {
      if (err) throw err;
      this.setState({ birds: birds });
    });
  }

  getCurDate() {
    const curDate = new Date();
    return `${curDate.getDate()}/${curDate.getMonth() +
      1}/${curDate.getFullYear()}`;
  }

  addQuantity(quant) {
    this.setState({ quantity: Math.floor(quant) });
  }

  addBird(bird) {
    this.setState({ bird: bird.id });
  }

  addDescription(e) {
    this.setState({ descr: e.target.value });
  }

  addDate(date) {
    this.setState({ date: date._d });
  }

  addLocation(lat, lng) {
    this.setState({ lat: lat, lng: lng });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { birds, state, ...rest } = this.state;
    axios
      .post(`${serverName}/api/birds/add-coordinate`, {bird: rest})
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
          <Divider>
            <h4 className="lead" style={{ marginTop: 20, marginBottom: 15 }}>
              What was the date of the encounter?
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
            <h4 className="lead">Which species did you identify?</h4>
          </Divider>

          <div className="container" style={{ width: "25%", marginBottom: 20 }}>
            <Search
              options={this.state.birds}
              multiple={false}
              handleChange={this.addBird}
            />
          </div>
          <Divider>
            <h4 className="lead" style={{ marginTop: 20, marginBottom: 15 }}>
              How many did you witness?
            </h4>
          </Divider>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <InputNumber min={1} defaultValue={1} onChange={this.addQuantity} />
          </div>
          <Divider>
            <h4 className="lead" style={{ marginTop: 20, marginBottom: 20 }}>
              Where was the encounter?
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
              }}
            >
              <div style={{ color: "white" }}>Submit </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContributeComponent;
