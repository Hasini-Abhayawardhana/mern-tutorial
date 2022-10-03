const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc getGoals
// @route GET   /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user : req.user.id})
    res.status(200).json({code: 200, message: `get Goals`, data: goals});
})

// @desc setGoal
// @route POST  /api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.char){
        res.status(400);
        throw new Error('Please add a char field')
    }
    
    const goal = await Goal.create({
        text : req.body.text,
        char : req.body.char,
        user: req.user.id
    })
    res.status(201).json({code: 201, message: `set Goal`, data : goal});
})

// @desc updateGoal
// @route PUT   /api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(404);
        throw new Error(`${req.params.id} goal not found`)
    }

    if(goal.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User has not permission')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({code: 200, message: `get Goal for id ${req.params.id}`, data: updatedGoal});
})

// @desc deleteGoal
// @route DELETE    /api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(404);
        throw new Error(`${req.params.id} goal not found`)
    }
    if(goal.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User has not permission')
    }
    await goal.remove()
    res.status(200).json({code: 200, message: `get Goal for id ${req.params.id}`});

    /*const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({code: 200, message: `get Goal for id ${req.params.id}`, data : deletedGoal});*/
    
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};