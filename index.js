//server side

const express = require('express');
//open socket on the server
const socket=require('socket.io');

// App setup
const app=express();

const server = app.listen(4000, ()=>{
    console.log('listening for requests on port 4000');
});

//static files
//we're gonna serve the static file
//(index.html) of the public folder to the app
//in the browser
app.use(express.static('public'));

//socket set up & pass server
//we went socket.io to work on this server
const io=socket(server);

//this will listen to the event connection
//we call this function when a connection is istablished
io.on('connection', (socket) => {
    console.log('made socket connection',socket.id);
    //listen to the data that comes from the client
    socket.on('chat',(data)=>{
        //send the data to all the clients connected to
        //the server
        //io.sockets : refers to all the sockets connected to the servers
        io.sockets.emit('chat',data);

    });

    socket.on('typing',(data) => {
        socket.broadcast.emit('typing',data);
    });

});

