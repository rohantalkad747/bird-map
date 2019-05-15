import  React from 'react';
import * as Images from "../../assets/logos";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Container,
    Nav,
    Button,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrow, faHome, faEye, faCloudUploadAlt, faHeart, faSignInAlt, faMapMarked, faTree} from '@fortawesome/free-solid-svg-icons'

library.add(faCrow, faHome, faEye, faCloudUploadAlt, faHeart, faSignInAlt, faMapMarked, faTree);


const iconStyle = {
    padding: 0,
    alignItems: 'center',
};
const navItemStyle = {
    '&:hover': {
        textDecoration: 'underline',
    }
};

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar light expand="md" style={{backgroundColor: '#e3f2fd'}}>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <NavbarBrand > <img src={Images.Logo} style={{height: '30%', width: '30%', paddingRight: 0}} alt="logo"/> </NavbarBrand>
                    <Nav navbar>
                        <NavItem style={navItemStyle}>
                            <NavLink href="#">
                                <FontAwesomeIcon icon="home" style={iconStyle} />  &nbsp; Home
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <FontAwesomeIcon icon="map-marked" style={iconStyle}/>
                                &nbsp; Maps
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <FontAwesomeIcon icon="crow" style={iconStyle} /> &nbsp;
                                    Bird Watch
                                </DropdownItem>
                                <DropdownItem>
                                    <FontAwesomeIcon icon="tree" style={iconStyle} /> &nbsp;
                                    Nest Watch
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            <NavLink href="#">
                                <FontAwesomeIcon icon="eye" style={iconStyle} /> &nbsp; Data
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">
                                <FontAwesomeIcon icon="cloud-upload-alt" style={iconStyle}/>
                                &nbsp; Submit
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">
                                <FontAwesomeIcon icon="heart" style={iconStyle}/>
                                &nbsp;
                                Donate
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                <NavItem style={{display: 'flex', justifyContent: 'right'}}>
                    <Button>
                        <FontAwesomeIcon icon="sign-in-alt" style={iconStyle}/>
                        &nbsp;
                        Login
                    </Button>
                </NavItem>
            </Navbar>
            </div>
        );
    }
}

export default Navigation;