const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// import router
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');
const db = require('./config/keys').mongooseURI;
// middleware router
app.use('/api/user', authRouter);
app.use('/api/posts',postRouter);
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.use('*',  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, access_token');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
// connect to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB connected...'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`server runing at ${PORT}...`));