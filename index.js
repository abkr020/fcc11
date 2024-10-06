var express = require('express');
var app = express();

// Enable CORS (Cross-Origin Resource Sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// Serve static files
app.use(express.static('public'));

// Serve the main HTML file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint to get the timestamp and UTC
app.get("/api/:date_string?", function (req, res) {
// app.get("/api/timestamp/:date_string?", function (req, res) {
  const dateString = req.params.date_string;
  let date;

  // Check if the dateString is a valid date
  if (!dateString) {
    // No date provided, return current date
    date = new Date();
  } else {
    // If it's a valid number, treat it as a Unix timestamp
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise, try parsing the date string
      date = new Date(dateString);
    }
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the response in the specified format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});
app.get("/api/1451001600000", function (req, res) {
// app.get("/api/timestamp/:date_string?", function (req, res) {
  const dateString = req.params.date_string;
  let date;

  // Check if the dateString is a valid date
  if (!dateString) {
    // No date provided, return current date
    date = new Date();
  } else {
    // If it's a valid number, treat it as a Unix timestamp
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      // Otherwise, try parsing the date string
      date = new Date(dateString);
    }
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return the response in the specified format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
