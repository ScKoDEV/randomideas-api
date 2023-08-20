const express = require('express');

const router = express.Router();

const ideas = [
    {
      id: 1,
      text: 'Very Positive NewsLetter, a newsletter that only shares positive, uplifting news',
      tag: 'Technology',
      username: 'TonyStark',
      date: '2022-01-02',
    },
    {
      id: 2,
      text: 'Milk cartons that turn a different color the older that your milk is getting',
      tag: 'Inventions',
      username: 'SteveRogers',
      date: '2022-01-02',
    },
    {
      id: 3,
      text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
      tag: 'Software',
      username: 'BruceBanner',
      date: '2022-01-02',
    },
  ];

// Get all ideas
router.get('/', (req, res) => {
    res.json({ success: true, data: ideas }); // do not need to specify content type
});

// Get single idea
router.get('/:id', (req, res) => {
    req.params.id; //access the :id parameter in the url
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res.status(404).json({success:false, error:'Ressource not found'});
    }
    
    res.json({ success: true, data: idea});
});

// Add an idea

router.post('/', (req, res) => {
    const idea = {
        id: ideas.length + 1,
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
        date: new Date().toISOString().slice(0,10)
    }

    ideas.push(idea);

    res.json({success: true, data: idea});
})

// Update an idea

router.put('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res.status(404).json({success:false, error:'Ressource not found'});
    }
    
    idea.text = req.body.text || idea.text;
    idea.tag = req.body.tag || idea.tag;

    res.json({ success: true, data: idea});
});

// Delete an idea

router.delete('/:id', (req, res) => {
    const idea = ideas.find((idea) => idea.id === +req.params.id);

    if (!idea) {
        return res.status(404).json({success:false, error:'Ressource not found'});
    }

    ideas.splice(ideas.map(ide => ide.id).indexOf(idea.id),1);

    // I used delete array method but this leaves a null in the DB - Splice does not do this

    res.json({ success: true, data: {}});
});

module.exports = router;