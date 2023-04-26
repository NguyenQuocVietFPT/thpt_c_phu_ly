const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

module.exports = mongoose.model("Subject", SubjectSchema);
