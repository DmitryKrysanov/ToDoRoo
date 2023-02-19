import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  isDone: {
    type: Boolean,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
});

TaskSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

TaskSchema.set('toJSON', { virtuals: true });
