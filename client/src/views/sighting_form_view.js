const PubSub = require('../helpers/pub_sub.js')

const SightingFormView = function (form) {
  this.form = form;
};

SightingFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  });
};

SightingFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const newBirdInfo = evt.target;
  PubSub.publish('SightingFormView:new-bird-submitted', newBirdInfo);
  this.form.reset();
}

module.exports = SightingFormView;
