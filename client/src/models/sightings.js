const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Sightings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
};

Sightings.prototype.bindEvents = function () {
  PubSub.subscribe('SightingView:sighting-delete-clicked', (evt) => {
    this.deleteSighting(evt.detail);
  });
  PubSub.subscribe('SightingFormView:new-bird-submitted', (evt) => {
    const newBirdInfo = evt.detail;
    const newSighting = this.createSighting(newBirdInfo);
    this.postSighting(newSighting);
  })
};

Sightings.prototype.getData = function () {
  this.request.get()
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.deleteSighting = function (sightingId) {
  this.request.delete(sightingId)
    .then((sightings) => {
      PubSub.publish('Sightings:data-loaded', sightings);
    })
    .catch(console.error);
};

Sightings.prototype.createSighting = function (birdInfo) {
  return {
    species: birdInfo.species.value,
    location: birdInfo.location.value,
    date: birdInfo.date.value
  }
};

Sightings.prototype.postSighting = function (sighting) {
  this.request.post(sighting)
  .then((sightings) => {
    PubSub.publish('Sightings:data-loaded', sightings);
  })
  .catch(console.error);
};

module.exports = Sightings;
