const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const commentRoutes = require('./routes/comment');

dotenv.config();

const app = express();

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/comments', commentRoutes);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });