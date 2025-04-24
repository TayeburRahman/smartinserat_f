const express = require('express');
const cors = require('cors');
const globalErrorHandler = require('./app/middlewares/globalErrorHandler');
const routes = require('./app/routes');
const NotFoundHandler = require('./errors/NotFoundHandler');
const cookieParser = require('cookie-parser');

const app = express();

app.use(
  cors({
    origin: [
      'https://321-maklerfrei.vercel.app', 
      "http://localhost:3000",
      "http://localhost*", 
      "http://smartinserat.de", 
      "https://smartinserat.de", 
      "www.smartinserat.de",
      "http://64.23.243.67:3000",
      "http://64.23.243.67:5174",
      "http://64.23.243.67:5173",
      "http://64.226.82.90:3000",
      "https://64.226.82.90:3000",
      "https://www.smartinserat.de",
      "http://localhost:5173",
      "smartinserat.de"  
  
    ],
    credentials: true,
  }),
);

// Parser Moved inside specifi routes for avoiding strip webhook confilict for raw body
// app.use(express.json());
// app.use(express.json({ limit: '900mb' }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true, limit: '900mb' }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static('uploads'));

// All Routes
app.use('/', routes);

// app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', async (req, res) => {
  res.json('Welcome to smartinserat server');
});

// Global Error Handler
app.use(globalErrorHandler);
// Handle not found
app.use(NotFoundHandler.handle);

module.exports = app;
