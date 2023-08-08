const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add this line
const axios = require('axios'); // Add this line for making HTTP requests
const config = require('./config'); // Import the shared config file


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

mongoose.connect(config.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create Mongoose models
const Connection = mongoose.model('Connection', {
    timestamp: { type: Date, default: Date.now },
});

const Text = mongoose.model('Text', {
    text: String,
});

app.use((req, res, next) => {
    // Log the connection in the Connection model
    const connection = new Connection();
    connection.save();
  
    next();
});

app.get('/api/test-connection', async (req, res) => {
    try {
      // Log the connection
      console.log('Connection made from frontend');
  
      // Insert the connection log into the Mongoose Model
      await Connection.create({ timestamp: new Date() });
  
      // Respond with success message
      res.status(200).send('Connection successful');
    } catch (error) {
      console.error('Error while handling connection:', error);
      res.status(500).send('Internal Server Error');
    }
});

  
app.post('/api/submit-text', async (req, res) => {
    const { text } = req.body;
  
    if (text) {
        const newText = new Text({ text });
        await newText.save();
        res.json({ success: true, message: 'Text inserted successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Text is required' });
    }
});


app.get('/api/get-ngrams', async (req, res) => {
    try {
      // Get the most recent 2 texts from the Text model
        const recentTexts = await Text.find()
            .sort({ _id: -1 })
            .limit(2)
            .select('text');
  
        if (recentTexts.length < 2) {
            return res.status(400).json({ success: false, message: 'Not enough texts for comparison' });
      }
  
      // Call the Django API with the recent texts
        const response = await axios.post(config.djangoUrl+'/api/ngrams/', {
            texts: [recentTexts[1].text, recentTexts[0].text],
      });
        res.json({ success: true, ngrams: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});
  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

  