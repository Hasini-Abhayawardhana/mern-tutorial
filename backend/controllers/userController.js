const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

const User = require("../models/userModel")

// @desc get user list 
// @route GET /api/users 
// @access private
const getUsers = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'get User'})
});

// @desc register a user
// @route POST /api/users 
// @access public
const RegisterUser = asyncHandler(async (req, res) => {
    //destructuring concept
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please complete all the fields')
    }
    
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({message: 'User Already Exists', data : userExists})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        name,
        email,
        password: hashedPw
    })

    if(newUser){
        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateJWT(user.id)
        })
        
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});

// @desc login User 
// @route POST /api/users/login 
// @access public
const loginUser = asyncHandler(async (req, res) => {

    const {email, password } = req.body
    
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password ))){
        res.status(200).json({ _id: user.id,
        name: user.name,
        email: user.email,
        token: generateJWT(user.id)
    })
    }else{
        res.status(400).json({message: 'Invalid user login'})
    }
});

// @desc get Auth user data 
// @route GET /api/users/me 
// @access private
const getAuthUserData = asyncHandler(async (req, res) => {
    const {_id, name, email } = req.user
    // res.status(200).json({id: _id, name, email})
    res.status(200).json({message: req.user})
});

const generateJWT = (id) => {  
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn: '30d'
    })
}
module.exports = {
    getUsers,
    RegisterUser,
    loginUser,
    getAuthUserData
}