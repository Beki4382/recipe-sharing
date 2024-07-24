const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/register', async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/profile', async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/profile', async(req, res) => {
    try {
        const updates = Object.keys(req.body);
        const user = await User.findById(req.user.id);
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;