const userModel = require('../Models/userModels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
// const { express } = require('express');


//to create a new token
const createToken = (_id)=>{
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, {expiresIn: "2d"})
}

//create a new user and save to database
//create a new user and save to database
const registerUser = async(req, res)=> {
        
    try{
        const { name, email, password, role = 'user' } = req.body;

        //check if user already exists and sets to variable
        let user = await userModel.findOne({ email });
        
        //if user exists send error message
        if (user) return res.status(400).json("User with the email already exists");

        //validate fields
        if (!name || !email || !password) return res.status(400).json("All fields are required");
        
        if(!validator.isEmail(email)) return res.status(400).json("Invalid email");

        if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong...");

        //create user
        user = new userModel({name, email, password, role});


        //hash the user password for security
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = createToken(user._id)

        res.status(200).json({_id: user._id, name, email, role, token});
    }catch(err) {
        console.log(err);
        res.status(500).json(err)
    }
};

const loginUser = async (req, res) => {
    const {email, password, role = 'user'} = req.body

    try {
        // Check for user
        let user = await userModel.findOne({ email, role });
        // If user does not exist
        if(!user) return res.status(400).json("Invalid email or password");
        // Validate Password
        const isValidPassword = await bcrypt.compare(password, user.password);
        // Return error if password is incorrect
        if(!isValidPassword) return res.status(400).json("Invalid email or password");

        // display details to show they're logged in
        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name: user.name, email, role, token});
    } catch (error) {
        console.log(error);
        res.status(500).json(err);
    }
};


// Finding one user by ID
const findUser = async (req, res) => {
    
    //Get user ID
    const userId = req.params.userId;

    try {
        const user = await userModel.findById(userId)

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// Getting all users by ID
const getUsers = async (req, res) => {
    
    try {
        const users = await userModel.find();

        res.status(200).json(users);
    } catch (error) {
        console.log(err);
        res.status(500).json(error)
    }
};

module.exports = {registerUser, loginUser, findUser, getUsers}