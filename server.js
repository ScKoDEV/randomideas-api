const path = require('path');
const express = require('express'); 
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');

connectDB();

const app = express();

//Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// We need middleware for the post request - Body parser
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the RandomIdeas API'}); // do not need to specify content type
});

// Cors Middleware
app.use(cors({
    origin: [
        'http://localhost:5001',
        'http://localhost:3000'
    ],
    credentials: true,
}))

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));