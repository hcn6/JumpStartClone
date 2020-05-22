const http = require('http');
const mongoose = require('mongoose');
const app = require('./app')
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port ${port}`));
console.log(mongoose.connection.readyState);