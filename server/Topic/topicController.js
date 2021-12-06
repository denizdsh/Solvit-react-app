const router = require('express').Router();
const service = require('./topicService');
const { isUser, isOwner } = require('../middlewares/guards');

router.get('/', async (req, res) => {
    const topics = await service.getAllTopics();
    res.json(topics);
})

router.get('/c/following', isUser(), async (req, res) => {
    const categories = req.user.categories;

    if (!categories) {
        res.status(400).json({ message: 'You haven\'t followed any catogies yet.' })
    }

    const topics = await service.getTopicsByCategories(categories);
    res.json(topics);
})

router.get(`/c/:category`, async (req, res) => {
    const category = req.params.category;
    const topics = await service.getTopicsByCategory(category);

    res.json(topics);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const topic = await service.getTopicById(id);
        res.json(topic);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.post('/', isUser(), async (req, res) => {
    const topic = {
        _ownerId: req.user._id,
        author: req.user.email,
        category: req.body.category || 'other',
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }

    try {
        res.json(await service.createTopic(topic));
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: 'All fields required. Title can be up to 200 characters long and description can be up to 1500 characters long. Image url must be valid.' });
        } else {
            res.status(400).json({ message: 'Database error.' });
        }
    }
})

router.delete('/:id', isOwner(), async (req, res) => {
    const id = req.params.id;
    try {
        const result = await service.deleteTopic(id);
        res.json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;