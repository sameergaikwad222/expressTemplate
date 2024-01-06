const mongoose = require("mongoose");
const { Schema } = mongoose;

const resourceSchema = new Schema(
  {
    prop1: {
      type: String,
      required: true,
    },
    prop2: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Resource", resourceSchema);
