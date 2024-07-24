const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async(req, res) => {
    try {
        const recipe = new Recipe({...req.body, user: req.user.id });
        await recipe.save();
        res.status(201).send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/', async(req, res) => {
    try {
        const recipes = await Recipe.find().populate('user', 'firstName lastName');
        res.send(recipes);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'firstName lastName');
        if (!recipe) return res.status(404).send({ message: 'Recipe not found' });
        res.send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', auth, async(req, res) => {
    try {
        const recipe = await Recipe.findOne({ _id: req.params.id, user: req.user.id });
        if (!recipe) return res.status(404).send({ message: 'Recipe not found' });
        Object.assign(recipe, req.body);
        await recipe.save();
        res.send(recipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async(req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!recipe) return res.status(404).send({ message: 'Recipe not found' });
        res.send({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;