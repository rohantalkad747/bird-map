import React from "react";
import { Alert } from "antd";

class AlertComponent {
    constructor () {
        this.alert = null;
    }

    get component() {
        return this.alert;
    }

    setSuccess(mssg, descr) {
        this.alert = (<Alert
            message= {mssg}
            description={descr}
            type="success"
            showIcon
        />);
    }

    setFailure(mssg, descr) {
        this.alert =  (<Alert
            message={mssg}
            description={descr}
            type="error"
            showIcon
        />);
    }
}

export default AlertComponent;
