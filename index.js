const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());


// use static files
app.use(express.static('./assets'));

//extract styles and scripts from sub pages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express layouts
app.use(expressLayouts);

// use express router
app.use('/',require('./routes'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
