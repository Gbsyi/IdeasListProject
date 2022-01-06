const {Router, urlencoded} = require('express');
const Idea = require('../models/Idea');
const router = Router();
const auth = require('../middleware/auth');

router.post('/create', auth, async (req, res) =>{
    try{
        const idea = new Idea({
            title: req.body.title,
            text: req.body.text,
            owner: req.body.userId
        })
        await idea.save(); 
        res.status(201).json({ createdId:idea.id });
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

router.get('/:id', auth, async (req,res) => {
    try{
        const idea = await Idea.findById(req.params.id);
        res.json(idea);
    }
    catch (e) {
        res.status(500).json({message: e.message});
    } 
});

router.put('/:id',urlencoded, auth, async (req,res) => {
    console.log(req.body);
    try{
        const idea = await Idea.findOneAndUpdate(req.params.id, req.body, {returnOriginal: false});
        res.sendStatus(200);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
});

module.exports = router;