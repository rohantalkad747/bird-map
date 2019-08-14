import axios from "axios";
import * as config from "../config";

/**
 * Returns an array of birds from the database.
 */
export function getBirds(callback) {
    axios
        .get(`${config.serverName}/api/birds/all-birds`)
        .then(res => callback(null, res.data))
        .catch(err => callback(err, null));
}