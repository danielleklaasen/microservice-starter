import * as mongoose from 'mongoose';

export type KittyModel = mongoose.Document & {
  name: string,
};

const kittySchema = new mongoose.Schema({ name: 'string' }, { timestamps: true });

const kitten = mongoose.model('Kitten', kittySchema);
export default kitten;
