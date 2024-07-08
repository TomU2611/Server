const User = require('../models/users');



const createUser = async (username, password, displayName, profilePicture) => {
    
    const newUser = new User({ 
        username: username,
        password: password, 
        displayName: displayName, 
        profilePicture: profilePicture 
    });
    console.log(newUser);
    try{
        return await newUser.save();
    }catch(error){
        console.log(error);
    }
    
};
const getUser = async (username, password) => {
    try {
        return await User.findOne({ username, password }).exec();
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username}).select('-password').exec();
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getUserById = async (id) => {
    try {
        return await User.findById(id).select('-password').exec();
    } catch (error) {
        console.log(error);
        return null;
    }
};
const checkUserExists = async (username) => {
    try {
        const user = await User.findOne({ username: username }).exec();
        return user !== null;
    } catch (error) {
        console.log(error);
        return false;
    }
};

// delete user
const deleteUser = async (username) => {
    try {
        const user = await User.find({username: username}).exec();
        if (!user) return null;
        
        await user.remove();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { createUser, getUser, getUserByUsername, getUserById, checkUserExists, deleteUser};