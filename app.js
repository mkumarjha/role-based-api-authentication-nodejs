const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

//Bring the database
const config = require('./config/database');

// Mongodb configuration 
mongoose.set('useCreateIndex',true);

//connect with the database
mongoose.connect(config.database,{ useNewUrlParser : true })
.then(()=>{
    console.log("database connected successfully "+ config.database);
}).catch(err=>{
    console.log(err);
});

//intialize the app
const app = express();

//Defining the PORT
const PORT = process.env.PORT ||5000;

// Defining Middleware
app.use(cors());

// set the static folder
app.use(express.static(path.join(__dirname,'public')));

// BodyParser Middleware 
app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.session());



app.get('/',(req,res)=>{
   return res.json({
        message: "This is nodejs roles based application"
   });  
});

// Bringing the users route
const users = require('./routes/users');
app.use('/api/users',users);


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})