const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User Schema
const spreadschema = mongoose.Schema(
{ data: {
    type: [[mongoose.Schema.Types.Mixed]], // 2D array of mixed types
    default: [] // Default to an empty array
  },
  name:{
    type: String,
      required: true,
  },
},

  {
    timestamps: true,
  }
);


const spreadsheetmodel = mongoose.model('Spreadsheet', spreadschema);

module.exports = spreadsheetmodel;
