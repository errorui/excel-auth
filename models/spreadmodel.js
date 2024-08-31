const mongoose = require('mongoose');

// Define User Schema
const spreadschema = mongoose.Schema(
  {
    data: {
      type: [[mongoose.Schema.Types.Mixed]], // 2D array of mixed types
      default: [], // Default to an empty array
    },
    name: {
      type: String,
      required: true,
    },
    spreadsheetId: {
      type: String, // Assuming the spreadsheetId is a string
      required: true, // Set this to false if it's not required
      unique: true, // Optional: Ensures that each spreadsheetId is unique
    },
  },
  {
    timestamps: true,
  }
);

const spreadsheetmodel = mongoose.model('Spreadsheet', spreadschema);

module.exports = spreadsheetmodel;

