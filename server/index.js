const app = require('express')();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => console.log(`Server listening on ${port}`));