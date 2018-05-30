import mongoose = require('mongoose');

export type KittyModel = mongoose.Document & {
  name: String,
};

const kittySchema = new mongoose.Schema({ name: String }, { timestamps: true });

const kitten = mongoose.model('Kitten', kittySchema);
export default kitten;