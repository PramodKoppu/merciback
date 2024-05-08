const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require("express");
const { UserGlobal } = require('../schema/userGlobalSchema');

const Router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/avatar/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

  Router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).send('No files were uploaded.');
        }
        const userId = req.body.userId; 
        await UserGlobal.findByIdAndUpdate(userId, { merci_image: req.file.path });
        res.status(200).send('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Internal server error');
      }
  });

  Router.delete('/deleteimage/:filename', (req, res) => {
    const filename = req.params.filename;
    const userId = req.body.userId; 
    const imagePath = path.join(__dirname, '../avatar', filename); 
    // Check if the file exists
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Error accessing file:', err);
        return res.status(404).send('File not found');
      }
  
      // Delete the file
      fs.unlink(imagePath, async (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return res.status(500).send('Internal server error');
        }
        await UserGlobal.findByIdAndUpdate(userId, { merci_image: null });
        res.status(200).send('File deleted successfully');
      });
    });
  });
  

  module.exports = Router