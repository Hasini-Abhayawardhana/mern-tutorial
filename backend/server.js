const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

//Environment data
const port = process.env.PORT || 3000;
const host = process.env.HOST || '127.0.0.1';   //host not defined on .env

//Middleware
const {errorHandler} = require('./middleware/errorMiddleware')

//DB
const {connectDB} = require('./config/db')

// Routes Initialize
// const {goalRoutes} = require('./routes/goalRoutes')
// const {userRoutes} = require('./routes/userRoutes')

// Connect to the database
connectDB();

//Initialize App
const app = express();

//Use App
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

//server frontend 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    })
}else{
    app.get('/', (req, res) => {
        res.send('Please set to production')
    })
}

//Error Handling
app.use(errorHandler)

//App Listen
app.listen(port, (req, res) => {
    console.log(`Server started on port ${port} and host ${host}`)
})