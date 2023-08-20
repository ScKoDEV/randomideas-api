const express = require('express'); 
const port = 5001;
const app = express();

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the RandomIdeas API'}); // do not need to specify content type
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));