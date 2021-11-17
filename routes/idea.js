const {Router} = require('express');
const {Idea} = require('../models/Idea');
const router = Router();
const auth = require('../middleware/auth');

router.post('/create', async (req, res) =>{
    try{
        const idea = new Idea({
            title: req.title,
            text: req.text,
            date: req.date,
            owner: req.user.userId
        })
    }
    catch (e) {
        res.status(500).json({message: e.message});
    } 
});

router.get('/', auth,  async (req,res) => {
    try{
        const ideas = await Idea.find({ owner: req.user.userId })
        res.json(ideas);
    }
    catch (e) {
        res.status(500).json({message: e.message});
    } 
});

router.get('/:id', async (req,res) => {
    try{
        const idea = await Idea.findById(req.params.id);
        res.json(idea);
    }
    catch (e) {
        res.status(500).json({message: e.message});
    } 
});

router.put('/:id', async (req,res) => {

});

module.exports = router;