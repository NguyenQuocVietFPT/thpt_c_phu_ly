const mongoose = require("mongoose");

const slug = require("mongoose-slug-generator");

const PostSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      slug: "tittle",
      unique: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);

module.exports = mongoose.model("Post", PostSchema);
