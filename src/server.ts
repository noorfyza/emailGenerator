import express from 'express';
import routes from './config/routes';

// Create Express app
const app = express();
const port = 3000;

app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});