var mongoose = require('mongoose');

var TripSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  confirmationNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  checkedIn: { type: Boolean, required: true },
  errorEmailSent: { type: Boolean, required: true },
  attempts: { type: Number, required: false },
  timeZoneDeparture: { type: String, required: true },
  dateTimeZoneDeparture: { type: String, required: true },
  dateToExecute: { type: String, required: true },
  dateTimeDeparture: { type: String, required: true },
  dateSubmitted: { type: String, required: true },
});

module.exports = mongoose.model('Trip', TripSchema);