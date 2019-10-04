const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/Users');
const { registerValidatoin, loginValidatoin } = require('../validate');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/register', urlencodedParser, async (req, res) => {
    // lets validate(xac minh) the data before we a user
    const { error } = registerValidatoin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //checking if the user is already in the database

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email already exists');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,

    });
    try {
        const saveUserd = await newUser.save();
        res.send(saveUserd);
        console.log(req.body);
    }
    catch (err) {
        res.sendStatus(404).send(err);
    }

});


router.post('/login', urlencodedParser, async (req, res) => {
    const { error } = loginValidatoin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

     function checkUser() {
        User.findOne({ email: req.body.email })
            .then( async user => {
                if(user) {
                    const validatePassword = await bcrypt.compare(req.body.password, user.password);
                    if (!validatePassword) return res.status(400).send('password is incorrect!!');
                    res.send('loggin successful !! ');
                } else {
                    res.status(400).send('email is not register');
                }
            });
    };
     await checkUser();

     //create and assign a token
     const tokenSecret = "dfsafasdfsedsf";
     const token = jwt.sign({_id:User._id},tokenSecret);
     res.header('auth-token',token).send(token); 
});

module.exports = router;