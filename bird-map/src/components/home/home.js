import {BrowserRouter as Router} from "react-router-dom";
import App from "../../App";
import * as Images from '../../assets/logos';
import Carousel from './carousel/carousel';
import React from "react";
import { Container, Button, Card, CardImg, CardBody, CardTitle, CardText, Row, Col} from 'reactstrap';
import './home.css';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col style={{backgroundColor: '#A9A5A4', marginLeft: 15}}>
                        <h4 className="display-4" style={{color: 'white', marginTop: 120}}><b>Welcome.</b> </h4>
                        <hr className="my-2" />
                        <p style={{color: 'white'}}>BirdMap offers a data platform for all birders to bring together their knowledge in understanding the migrational and nesting patterns of various
                        birds. This project is about citizen science and everyone is encouraged to contribute. Data can be readily accessed by the public. </p>
                    </Col>
                    <Col className="col-sm-8" style={{paddingLeft: 0}}>
                        <Carousel/>
                    </Col>
                </Row>
                <Row>
                <Container>
                    <p className="display-4" style={{textAlign: 'center', justifyContent: 'center'}}>Our Platform </p>
                </Container>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <CardImg top width="100%" src={Images.Map} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Maps</CardTitle>
                                <CardText>Interactive maps feature your favorite birds, telling you where to look next time you go birding.</CardText>
                                <Button>See more ...</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardImg class="image" top width="100%" src={Images.Graph} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>Visuals</CardTitle>
                                <CardText>Bar graphs, pie charts, tables: this data is freely available to the public and researchers alike.. </CardText>
                                <Button>See more ...</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
    );
    }
}

export default Home;