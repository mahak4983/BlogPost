const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const blogRoutes = require('./routes/blog');
const commentRoutes = require('./routes/comment');
const loginRoutes = require('./routes/login');


// const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-nlcrx.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(blogRoutes);
app.use(commentRoutes);
app.use(loginRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(result => {
        console.log('connected')
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => {
        console.log(err);
    })