/**
 * Data access object for bird coordinates.
 */
class GeoJSONModel {
    constructor(geoJSONParams) {
        const {lat, lng, birdId, numb, dateTaken} = geoJSONParams;
        this.lat = lat;
        this.lng = lng;
        this.birdId = birdId;
        this.numb = numb;
        this.dateTaken = dateTaken;
        this.descr = geoJSONParams.descr;
    }
    save();
    static get Builder() {
        class Builder {
            withLat(lat) {
                if (lat < 0 || lat > 90) throw Error("Invalid latitude!");
                this.lat = lat;
                return this;
            }
            withLng(lng) {
                if (lng < 0 || lng > 180) throw Error("Invalid longitude!");
                this.lng = lng;
                return this;
            }
            withBirdId(birdId) {
                if (birdId < 0) throw Error("Bird id is not valid!");
                this.birdId = birdId;
                return this;
            }
            withNumb(numb) {
                if (numb < 0) throw Error("Number must be greater than zero!");
                this.numb = numb;
                return this;
            }
            withDateTaken(dateTaken) {
                if (dateTaken.getTime() > new Date().getTime()) throw Error("Date must be in the past!");
                this.dateTaken = dateTaken;
                return this;
            }
            withDescr(descr){
                this.descr = descr;
            }
            build() {
                return new GeoJSONModel(this);
            }
        }
        return Builder;
    }
}

module.exports = GeoJSONModel;