// Import express, set "app" to be the server object
let express = require("express");
let app = express();

// Enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

// http://expressjs.com/en/starter/static-files.html
// Serve static css file from public directory using middleware
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// Home http route that serves the html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint route that returns a greeting in JSON
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint route that returns a timestamp in JSON
app.get("/api/:date?", (req, res) => {
  const date = req.params.date;

  if (!date) {
    inputDate = new Date();
  } else if (!isNaN(date)) {
    inputDate = new Date(parseInt(date));
  } else {
    inputDate = new Date(date);
  }

  if (inputDate.toUTCString() == "Invalid Date") {
    res.json({"error": "Invalid Date"})
  } else {
    res.json({
      "unix": inputDate.getTime(),
      "utc": inputDate.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
