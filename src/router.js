const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {
    const userInput = req.body;

    if (userInput.username === mockUser.username && userInput.password === mockUser.password) {
        const token = jwt.sign({username : userInput.username}, process.env.JWT_SECRET)
        return res.json({token});
    }
    return res.json({error: 'Invalid username or password'});
});

router.get('/profile', (req, res) => {
  const token = req.get('authorization');
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return res.json({profile: mockUser.profile}) 
    } catch (error) {
        return res.json({error: 'invalid login authorization'})
    }

});


module.exports = router;
