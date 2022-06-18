const mongoose = require("mongoose");

const urlModel = mongoose.Schema(
  {
    url: { type: "String", trim: true, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
 
  
  // { collection: "Web-Health-Monitor" }
);

const Url = mongoose.model("Url", urlModel);

module.exports = Url;
