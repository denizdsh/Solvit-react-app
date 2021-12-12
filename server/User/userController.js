const router = require('express').Router();

const { isGuest } = require('../middlewares/guards')
const { register, login, getImageByUsername } = require('./userService');

router.post('/register', isGuest(), async (req, res) => {
    const email = req.body.email.trim().toLocaleLowerCase();
    const password = req.body.password.trim();
    const imageUrl = req.body.imageUrl.trim();

    try {
        if (!email) {
            throw new Error('Email is required!');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const user = await register(email, password, imageUrl);

        res.json(user);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
})

router.post('/login', isGuest(), async (req, res) => {
    const email = req.body.email.trim().toLocaleLowerCase();
    const password = req.body.password.trim();

    try {
        const user = await login(email, password);
        res.json(user);
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }
})

router.get('/u/:username/image', async (req, res) => {
    const username = req.params.username;
    const image = await getImageByUsername(username);
    res.json(image);
})

module.exports = router;