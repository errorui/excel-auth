const express = require('express');
const router = express.Router();
const {
  checkSpreadsheetId,
  getSpreadsheetContent,
  updateSpreadsheet,
  createSpreadsheetAndUpdateUsers,
  getSpreadsheetContentByChecking
} = require('../controllers/spreasheetcontroller');


// Route to create a spreadsheet and update users' projects
router.post('/create-spreadsheet', createSpreadsheetAndUpdateUsers);
// Route to check if a given spreadsheetId is present in the user's projects array by email
router.get('check/:email/:spreadsheetId', checkSpreadsheetId);

// Route to get spreadsheet content by spreadsheetId
router.get('/spreadsheet/:spreadsheetId', getSpreadsheetContent);
router.get('/spreadsheet/:email/:spreadsheetId', getSpreadsheetContentByChecking);

// Route to update spreadsheet data and name by spreadsheetId
router.post('/spreadsheet/:spreadsheetId', updateSpreadsheet);

module.exports = router;
