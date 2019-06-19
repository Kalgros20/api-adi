const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tipo:String,
  nome:String,
  desc:String,
  urlFoto:String,
  urlVideo:String,
  latitude:String,
  longitude:String
});


module.exports = mongoose.model("Car", carSchema);
