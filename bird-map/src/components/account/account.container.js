import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import LoginForm from './forms/login.form'
import RegisterForm from "./forms/register.forms";

class AccountContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        };
        this.flipForms = this.flipForms.bind(this);
    }

    flipForms(e) {
        e.preventDefault();
        this.setState(prevState => { return {isLogin: !(prevState.isLogin)}});
    }
    render() {
        let displayForm = this.state.isLogin ? <LoginForm flipForms={this.flipForms}/> : <RegisterForm flipForms={this.flipForms}/>;
        return (
            <div> { displayForm } </div>
        );
    }
}

export default AccountContainer;
