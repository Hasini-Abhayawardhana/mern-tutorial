import axios from "axios";

const API_URL = '/api/goals/';

//Create new goal 
const CreateGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)

    return response.data
}

//Get user goals 
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization:  `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data
}


//Delete Goal 
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goalId, config)
    return response.data    
}

const goalService = {
    CreateGoal,
    getGoals,
    deleteGoal
}

export default goalService