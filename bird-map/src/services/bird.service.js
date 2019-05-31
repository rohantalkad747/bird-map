import axios from 'axios';
import * as config from '../../config';

function getBirds() {
    axios.get(`${config.serverName}/birds`)
}