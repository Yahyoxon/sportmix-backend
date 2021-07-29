const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
        type: String,
        required: true,
      },
    image: {
        type: String,
        required: false,
      },
    filter_by: {
        type: String,
        required: false,
      },
    telegram_chat_id: {
        type: String,
        required: false,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);