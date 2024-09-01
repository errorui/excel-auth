const express = require('express');
const router = express.Router();
const {
  checkSpreadsheetId,
  getSpreadsheetContent,
  updateSpreadsheet,
  createSpreadsheetAndUpdateUsers,
  getSpreadsheetContentByChecking,
  deleteSpreadsheet
} = require('../controllers/spreasheetcontroller');
// Route to create a spreadsheet and update users' projects--checked
router.post('/create-spreadsheet', createSpreadsheetAndUpdateUsers);
//checked
// Route to check if a given spreadsheetId is present in the user's projects array by email
// router.get('check/:email/:spreadsheetId', checkSpreadsheetId);

// Route to get spreadsheet content by spreadsheetId-checked
router.get('/spreadsheet/:spreadsheetId', getSpreadsheetContent);

router.post('/check/:spreadsheetId',  getSpreadsheetContentByChecking);

// Route to update spreadsheet data and name by spreadsheetId
router.post('/spreadsheet/:spreadsheetId', updateSpreadsheet); // Need data and name in the body

router.post('/delete/:spreadsheetId', deleteSpreadsheet);

module.exports = router;
