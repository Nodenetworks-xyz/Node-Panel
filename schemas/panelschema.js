const mongoose = require('mongoose')
// Make a constant for required Strings
const reqString = {
  type: String,
  required: true,
}
// Make a constant for required Booleans
const reqBoolean = {
  type: Boolean,
  required: true,
}

const commandPanelSchema = mongoose.Schema({
// Info we will be adding to our mongodb
  _id: reqString,
  uploadactive: reqBoolean,
  loginactive: reqBoolean,
  uniqueid: reqString,
  mainfile: reqString,
  directory: reqString,
  
})

module.exports = mongoose.model('panel', commandPanelSchema)