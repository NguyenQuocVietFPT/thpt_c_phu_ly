const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    quatity: {
      type: Number,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", ClassSchema);
