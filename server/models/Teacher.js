const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
    },
    birthday: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
