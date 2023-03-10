const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database');

const mainRoutes = require('./routes/main');
const songRoutes = require('./routes/songs');
const manageRoutes = require('./routes/manage');
const uploadRoutes = require('./routes/upload');
const profileRoutes = require('./routes/profile');
const deleteRoutes = require('./routes/delete');

const PORT = process.env.PORT || 9001;

const app = express();

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

//Connect To Database
// connectDB();

//Using EJS for views
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static('public'));

//Use Cors
app.use(cors());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger('dev'));

//Use forms for put / delete
app.use(methodOverride('_method'));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/songs', songRoutes);
app.use('/manage', manageRoutes);
app.use('/upload', uploadRoutes);
app.use('/profile', profileRoutes);
app.use('/delete', deleteRoutes);

//Connect To Database
connectDB().then(() => {
  //Server Running
  app.listen(PORT, () => {
    console.log('Server is running, you better catch it!');
  });
});
