const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EmailSchema = new Schema(
  {
    value: {
      type: String, lowercase: true, trim: true,
      index: true, unique: true,
      required: true,
      validate: {
        validator: function (text) {
          return text.includes('@');
        },
        message: "Email must have '@'."
      },
    },
  }, {
    _id: false,
    __v: false,
    timestamps: false,
  }
);

const Email = mongoose.model('Email', EmailSchema);

module.exports = Email;
module.exports.EmailSchema = EmailSchema;
