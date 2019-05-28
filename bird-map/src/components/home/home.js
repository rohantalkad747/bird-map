import {BrowserRouter as Router} from "react-router-dom";
import * as Images from '../../assets/logos';
import Carousel from './carousel/carousel';
import React from "react";
import './home.css';

const card = (img, title, txt) => {
    return (
    <div className="card" style={{width: '18rem'}}>
        <img className="card-img-top logo" src={img} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title"> {title} </h5>
                <p className="card-text">{txt}</p>
            </div>
    </div>
)};

class Home extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: '#f7f7f9'}}>
                <div className="row"style={{paddingBottom: 50}}>
                    <div className="col-sm-4" >
                        <div className="jumbotron">
                            <h1>BirdMap</h1>
                            <p className="lead">BirdMap is truly a citizen science effort. It provides a platform for both birders and ornithologists to collate and analyze the migrational and nesting patterns of various bird species.
                            </p>
                            <div className="container">
                            <button className="search-box" id='search-box' style={{backgroundColor: 'black', alignContents: 'center', marginTop: 20, marginLeft: 20, height: 60, width: 100}}><div style={{color: 'white'}}>Learn more</div></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <Carousel />
                    </div>
                </div>
                <hr />
                <div className="row" style={{marginBottom: 20, padding: 50}}>
                    <div className="container">
                        <div className="card-deck" data-aos="zoom-in" style={{marginLeft: 20, marginRight: 20}}>
                            {card(Images.Chicakdee, "Maps", "Maps with your favorite species are plotted in real time, so you know where to go next time you bird!" +
                                " Nesting locations and other migrational data are also shown, giving researchers a powerful tool for ornithology. ")}
                            {card(Images.Chicakdee, "Media", "This community platform is big on the sharing of our birding experiences. You can upload your photos, audio recordings, and videos of birds directly for your fellow birders! ")}
                            {card(Images.Chicakdee, "Maps", "Maps with your favorite species are plotted in real time, so you know where to go next time you bird!" +
                                "Nesting locations and other migrational data are also shown, giving researchers a powerful tool for ornithology. ")}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="jumbotron" style={{backgroundColor: '#1a1a1a', paddingTop: 150, paddingBottom: 150}}>
                            <h1 style={{color: 'white', textAlign: 'center', marginBottom: 30}}>Our Sponsors.</h1>
                            <div style={{marginLeft: '20%', marginRight: '20%', marginBottom: 50}}>
                                <a href="http://www.natureconservancy.ca/en/"> <img className="partner logo" data-aos="fade-right" src={Images.canadaBird} alt={"Canada Bird Association"} /> </a>
                                <a href="https://lassonde.yorku.ca/"><img className="partner logo" data-aos="fade-up" src={Images.lassonde} alt={"Canada Bird Association"} /></a>
                                <a href="https://www.svca.on.ca/"><img className="partner logo" data-aos="fade-right" src={Images.Toronto} alt={"Canada Bird Association"} /></a>
                            </div>
                            <h1 style={{color: 'white', textAlign: 'center'}}> Help Support the BirdMap initiative.</h1>
                            <div className="container" data-aos="fade-up">
                                <button className="search-box" id="search-box" style={{backgroundColor: 'white', alignContents: 'center', height: 60, width: 100, marginTop: 30, marginLeft: '45%', marginRight: '40%'}}><div style={{color: 'black'}}>Donate</div></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;