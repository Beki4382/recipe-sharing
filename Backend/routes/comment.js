const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:recipeId', auth, async(req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId);
        if (!recipe) return res.status(404).send({ message: 'Recipe not found' });
        const comment = new Comment({...req.body, author: req.user.id, recipe: req.params.recipeId });
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:recipeId', async(req, res) => {
    try {
        const comments = await Comment.find({ recipe: req.params.recipeId }).populate('author', 'firstName lastName');
        res.send(comments);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', auth, async(req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id, author: req.user.id });
        if (!comment) return res.status(404).send({ message: 'Comment not found' });
        Object.assign(comment, req.body);
        await comment.save();
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/:id', auth, async(req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: req.user.id });
        if (!comment) return res.status(404).send({ message: 'Comment not found' });
        res.send({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;