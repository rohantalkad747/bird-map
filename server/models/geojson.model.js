/**
 * Data access object for bird coordinates.
 */

const { formatDate } = require("../util/util");

class GeoJSONModel {
  constructor(geoJSONParams) {
    const { lat, lng, birdId, numb, dateTaken, descr } = geoJSONParams;
    this.lat = lat;
    this.lng = lng;
    this.birdId = birdId;
    this.numb = numb;
    this.dateTaken = dateTaken;
    this.descr = descr;
  }
  static get Builder() {
    class Builder {
      withLat(lat) {
        this.lat = lat;
        return this;
      }
      withLng(lng) {
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
        if (dateTaken.getTime() > new Date().getTime())
          throw Error("Date must be in the past!");
        this.dateTaken = formatDate(dateTaken);
        return this;
      }
      withDescr(descr) {
        this.descr = descr;
        return this;
      }
      build() {
        return new GeoJSONModel(this);
      }
    }
    return Builder;
  }
}

module.exports = GeoJSONModel;
