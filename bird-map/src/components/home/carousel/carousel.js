import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const items = [
    {
        src: 'https://download.ams.birds.cornell.edu/api/v1/asset/157033771/1200',
        altText: 'Purple Finch',
        caption: 'By Kajan Kumarathas on January 4th 2019',
        header: 'Purple Finch'
    },
    {
        src: 'https://download.ams.birds.cornell.edu/api/v1/asset/63568211/1200',
        altText: 'Mallard',
        caption: 'By Rohan Talkad on February 2nd 2019',
        header: 'Mallard'
    },
    {
        src: 'https://download.ams.birds.cornell.edu/api/v1/asset/156205531/1200',
        altText: 'Eastern Phoebe ',
        caption: 'By Richard Luces on December 3rd 2018',
        header: 'Eastern Phoebe'
    }
];

const Carousel = () => <UncontrolledCarousel items={items} />;

export default Carousel;
