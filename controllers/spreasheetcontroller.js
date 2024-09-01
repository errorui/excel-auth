const User = require('../models/usermodel'); // Adjust the path to your User model
const Spreadsheet = require('../models/spreadmodel'); // Adjust the path to your Spreadsheet model
const { v4: uuidv4 } = require('uuid'); 
// Existing function to check if a given spreadsheetId is present in the user's projects array
const checkSpreadsheetId = async (req, res) => {
  try {
    const { email, spreadsheetId } = req.params;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the spreadsheetId is present in the user's projects array
    const isSpreadsheetPresent = user.projects.some(
      (project) => project.spreadsheetId === spreadsheetId
    );

    return res.status(200).json({ found: isSpreadsheetPresent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to get spreadsheet content by spreadsheetId
const getSpreadsheetContent = async (req, res) => {
  try {
    const { spreadsheetId } = req.params;

    // Find the spreadsheet by spreadsheetId
    const spreadsheet = await Spreadsheet.findOne({ spreadsheetId });

    if (!spreadsheet) {
      return res.status(404).json({ message: 'Spreadsheet not found' });
    }

    // Return the spreadsheet content
    return res.status(200).json({ data: spreadsheet.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to update spreadsheet data and name by spreadsheetId
const updateSpreadsheet = async (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const { data, name } = req.body;
    console.log(data);
    console.log(name);
    // Find the spreadsheet by spreadsheetId
    const spreadsheet = await Spreadsheet.findOne({ spreadsheetId });

    if (!spreadsheet) {
      return res.status(404).json({ message: 'Spreadsheet not found' });
    }

    // Update the spreadsheet data and name
    if (data) spreadsheet.data = data;
    if (name) spreadsheet.name = name;

    // Save the updated spreadsheet
    await spreadsheet.save();

    return res.status(200).json({ message: 'Spreadsheet updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const createSpreadsheetAndUpdateUsers = async (req, res) => {
  try {
    const spreadsheetId = uuidv4();
    const { users, spreadSheetName } = req.body; 
    // Create the spreadsheet document
    const newSpreadsheet = new Spreadsheet({
      spreadsheetId,
      name: spreadSheetName, 
      data: [] 
    });

    await newSpreadsheet.save(); 

    for (const user of users) {
      const { email, canWrite } = user; 

      const foundUser = await User.findOne({ email });

      if (foundUser) {
        foundUser.projects.push({
          write: canWrite,
          spreadsheetId
        });

        await foundUser.save(); 
      } else {
        console.log(`User with email ${email} not found.`);
      }
    }

    return res.status(201).json({
      message: 'Spreadsheet created and users updated successfully',
      spreadsheetId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSpreadsheetContentByChecking = async (req, res) => {
  try {
    const {  spreadsheetId } = req.params;
    const {email}=req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const spreadsheet = await Spreadsheet.findOne({ spreadsheetId });

    if (!spreadsheet) {
      return res.status(404).json({ message: 'Spreadsheet not found' });
    }
    // Check if the spreadsheetId is present in the user's projects array
    const isSpreadsheetPresent = user.projects.some(
      (project) => project.spreadsheetId === spreadsheetId
    );
    if(!isSpreadsheetPresent){
      return res.status(404).json({message:'Spreadsheet access denied'});
    }
    return res.status(200).json({ data: spreadsheet.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteSpreadsheet= async(req, res)=>{
  const {spreadsheetId}= req.params;
  const {email}= req.body;
  const spreadsheet= await Spreadsheet.findOne({spreadsheetId});
  if(!spreadsheet){
    return res.status(404).json({message:'Spreadsheet Doest not exist'});
  }
  const user=  await User.findOne({email});
  const isSpreadsheetPresent = user.projects.some(
    (project) => project.spreadsheetId === spreadsheetId
  );
  if(!isSpreadsheetPresent){
    return res.status(404).json({message:'Spreadsheet access denied'});
  }
  user.projects = user.projects.filter(
    (project) => project.spreadsheetId !== spreadsheetId
  );
 await  user.save();
 return res.status(200).json({message:'Succesfully deleted'});
}
module.exports = {
  checkSpreadsheetId,
  getSpreadsheetContent,
  updateSpreadsheet,
  createSpreadsheetAndUpdateUsers,
  getSpreadsheetContentByChecking,
  deleteSpreadsheet
};