const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


//for kue gui
const kue = require('kue');


// used for session cookie and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const passportJWT = require('./config/passport-jwt');
const passportgoogle = require('./config/passport-google-oauth');
const mongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))


app.use(express.urlencoded({extended:false}));

app.use(cookieParser());


// use static files
app.use(express.static('./assets'));

// make the uploads path available to browser
app.use('/uploads', express.static(__dirname +'/uploads'));

//extract styles and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express layouts
app.use(expressLayouts);


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session
app.use(session({
    name:'chatncode',
    //TODO change the secret b4 deployment
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: mongoStore.create({
        mongoUrl: 'mongodb://localhost/cookie_test',
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        if(err){
            console.log(`${err}while storing session`);
        }
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

kue.app.listen(3000);
