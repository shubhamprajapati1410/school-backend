const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('./../models/User.Model');
const jwt = require('jsonwebtoken');


//Register Route
//post api/auth/register
router.post('/signup', async (req, res) => {
try{
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ status: 'N', error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ status: 'N', error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ status: 'Y', message: 'User registered successfully' });
}catch(error){
    console.log(error);
    return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
}
});

//login Route
//post api/auth/login
router.post('/login', async (req, res) => {
try{
    const {  email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 'N', error: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({ status: 'N', error: 'invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
        return res.status(400).json({ status: 'N', error: 'invalid email or password' });
    }
    const token = jwt.sign({userId: existingUser._id,email: existingUser.email ,name: existingUser.name},process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ status: 'Y', message: 'loged In successfully', token ,user: { id: existingUser._id, name: existingUser.name, email: existingUser.email } });
}catch(error){
    console.log(error);
    return res.status(500).json({ status: 'N', error: `Internal Server Error:${error}` });
}
});

module.exports = router;
