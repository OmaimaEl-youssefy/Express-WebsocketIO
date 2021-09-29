//Make Connection

//socket for the client
 socket = io.connect('http://localhost:4000'); 

//Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback=document.getElementById('feedback');

//Emit events to the server
btn.addEventListener('click',function(){
    //1st param :"chat" is the name of the message
    //2nd param: the data we send to the server
    socket.emit('chat',{
        message : message.value,
        handle : handle.value, 
    });
    message.value="";
});//now we need to handle this message on the server side

message.addEventListener('keypress',() => {
    socket.emit('typing',handle.value);
});

//listen for events

socket.on('chat',(data) => {
    feedback.innerHTML='';
    output.innerHTML += '<p><strong>'+ data.handle + ': </strong>'+data.message+'</p>';
});

socket.on('typing',data => {
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>';
});

