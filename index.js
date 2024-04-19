const app = require('./app'); 

const server = app.listen(3000, () => {
    console.log("Listening on localhost port 3000");
});

module.exports = server;