
// PRA RODAR O DB USE => npm run db

const cors = require('cors');
const express = require('express');
const apiRouter = require('./routes');
const server = express();

server.use(cors());
server.use(express.json());
server.use('/program-me', apiRouter);

server.listen(4000, () => {
    console.log('Server listening on port 4000')
});
