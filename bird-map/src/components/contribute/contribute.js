import { Steps } from "antd";
import React from "react";

const { Step } = Steps;

class ContributeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }
  render() {
    return (
      <div>
        <div style={{width: "75%", marginLeft: "auto", marginRight: "auto", marginTop: 35, marginBottom: "auto"}}>
            <Steps current={this.state.step}>
                <Step title="Who?"/>
                <Step title="Where?" />
                <Step title="What?" />
            </Steps>
        </div>
        {this.state.curStep}
      </div>
    );
  }
}

export default ContributeComponent;
