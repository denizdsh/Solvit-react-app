const router = require('express').Router();

const { isGuest, isUser } = require('../middlewares/guards')
const { register, login } = require('./userService');

router.post('/register', isGuest(), async (req, res) => {
    const email = req.body.email.trim().toLocaleLowerCase();
    const password = req.body.password.trim();

    try {
        if (!email) {
            throw new Error('Email is required!');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        const user = await register(email, password);

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

module.exports = router;