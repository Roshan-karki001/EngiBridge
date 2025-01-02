const express = require("express");
const cors = require('cors');

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const recipemodel = require("./models/recipedata.js");
app.use(express.json());

const connectDB = require("./config/database.js");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

startServer();

// route diney tanney 
// Get all recipes
const Router = require('./route/recipe.route.js');

app.use('/api/recipes', Router);
app.use('/api', Router);


// sign up function
const signupSchema = require("../backend/models/signupmodel.js");

// router of sign in
const SigninRouter = require('../backend/route/signinroute.js');


app.use('/api/signin',SigninRouter);


// for auth

const authRoutes = require('./route/auth.js');
// Routes
app.use('/api/auth', authRoutes);




