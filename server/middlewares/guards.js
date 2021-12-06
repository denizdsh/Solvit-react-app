module.exports = {
    isGuest() {
        return (req, res, next) => {
            if (req.user) {
                req.status(400).json({ message: 'You are already signed in.' });
            }
            else {
                next();
            }
        }
    },
    isUser() {
        return (req, res, next) => {
            if (!req.user) {
                req.status(401).json({ message: 'Please sign in.' });
            }
            else {
                next();
            }
        }
    },
    isOwner() {
        return (req, res, next) => {
            if (req.user._id != req.body._ownerId) {
                res.status(403).json({ message: 'You are not authorized to perform this action.' });
            }
            else {
                next();
            }
        }
    }
};