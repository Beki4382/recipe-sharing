const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [{
        item: String,
        quantity: String
    }],
    instructions: {
        type: String,
        required: true
    },
    preparationTime: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


module.exports = mongoose.model('Recipe', RecipeSchema);