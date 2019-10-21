import React from 'react';
import {Bar} from 'react-chartjs-2';
import Typed from "react-typed";
import WhoMap from '../contribute/whomap.js';
import { Row, Col, Input,InputNumber, Select, AutoComplete, Cascader, Button, Tabs } from 'antd';
import { getBirds } from "../../services/birds.service";
import axios from "axios";
const { TabPane } = Tabs;
const InputGroup = Input.Group;
const { Option } = Select;

const IND_TO_MONTH = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October", 
    11: "November",
    12: "December"
}


const getGraph = (birds, label, monthly=false) => { return {
    labels: monthly ? Object.keys(birds).map(m => IND_TO_MONTH[m]) : Object.keys(birds),
    datasets: [
      {
        label: label,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: Object.values(birds)
      }
    ]
};}

class Graph extends React.Component{

    constructor(props) {
        super(props);
        this.addLocation = this.addLocation.bind(this);
        this.state = { 
            radius: "10000",
            birds: [],
            lat: 43.6478275796959,
            lng: -79.34345483779909,
            bird_id: 2,
            year: 2019,
            monthlyData: [],
            yearlyData: []
        }
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })
          });
          this.selectBird = this.selectBird.bind(this);
          this.loadData = this.loadData.bind(this);
    }

    selectBird(e) { 
        console.log(e);
        this.setState({bird_id: e});
    }

    componentDidMount() {
        getBirds((err, birds) => {
            console.log(birds);
            if (!err)
                this.setState({birds: birds});
        });
        this.loadData();
    }

    loadData() {
        axios.post('http://localhost:2500/api/birds/graph-birds', { options: { 
            origin: { lat: this.state.lat, lng: this.state.lng },
            MONTHLY: this.state.year,
            radius: this.state.radius
        },
            birdId: this.state.bird_id
        }).then(res => {
            this.setState({monthlyData: res.data})
        })
        axios.post('http://localhost:2500/api/birds/graph-birds', { options: { 
            origin: { lat: this.state.lat, lng: this.state.lng },
            YEARLY: true,
            radius: this.state.radius
        },
            birdId: this.state.bird_id
        }).then(res => {
            console.log(res)
            this.setState({yearlyData: res.data})
        })
    }


    addLocation(lat, lng) {
        console.log(lat, lng)
        this.setState({ lat: lat, lng: lng });
    }

  render() {
      console.log(this.state)
    var selected = this.state.birds.map(bird => <Option value={bird.id}> {bird.bird_name} </Option>);
    return (
      <div className="container graph" style={{textAlign: "center", marginTop: 25,
      marginBottom: 50}}>
      <h1>
      <Typed
        typedRef={typed => {
          this.typed = typed;
        }}
        strings={["Graphs"]}
        typeSpeed={65}
      />
    </h1>
    <p> <i> Begin by selecting your location and the radius of your query. Then select a bird and the results will pop up momentarily. </i></p>
        <Row>
        <Col span={18} push={6}>
        <InputGroup  style={{marginLeft: "20%"}}>
          <Row gutter={8}>
            <Col span={4}>
                Choose Bird
                { (() => {
                    if (this.state.birds.length > 0)
                        return <Select defaultValue={this.state.bird_id} onChange={this.selectBird} style={{ width: 120 }}>
                        { selected }
                      </Select>
                        
                    else return <div></div>;
                    })()}
            </Col>
            <Col span={6}>
              Within Radius (km) <Input defaultValue="10" onChange={(e) => { this.setState({radius: 1000 * e.target.value})}}/>
            </Col>
            <Col span={2}>
              Year <Input defaultValue="2019" onChange={(e) => { this.setState({year: e.target.value})}}/>
            </Col>
            <Button style={{marginTop: "2%"}} type="primary" shape="square" icon="redo" size={15} onClick={this.loadData }/>
          </Row>
        </InputGroup>
        <Tabs defaultActiveKey="1">
        <TabPane tab="Monthly" key="1">
        <Bar
        data={getGraph(this.state.monthlyData, "Monthly Count", true)}
        options={{
        maintainAspectRatio: true
        }}
    />
        </TabPane>
        <TabPane tab="Yearly" key="2">
        <Bar
        data={getGraph(this.state.yearlyData, "Yearly Count")}
        options={{
        maintainAspectRatio: true
        }}
    />
        </TabPane>
    </Tabs>
    
        </Col>
        <Col span={6} pull={18}>
        <WhoMap lat={this.state.lat} lng={this.state.lng} addLocation={this.addLocation}/>
        </Col>
        </Row>
      </div>
    );
  }
};

export default Graph;