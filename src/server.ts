import express from 'express';
import routes from './config/routes';

const cors = require('cors');
// Create Express app
const app = express();
const port = 3000;

app.use(cors());

app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});