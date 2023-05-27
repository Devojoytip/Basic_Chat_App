const socket = io('http://localhost:8000');

const messageDiv = document.getElementById('message-div');
const container = document.getElementById('container');
const sendDiv = document.getElementById('send-div');
const joinBtn = document.getElementById('join-btn');
const sendBtn = document.getElementById('send-btn');
const leaveBtn = document.getElementById('leave-btn');
const audio=new Audio('ding.mp3');

const appendfn = (msg, position) => {
    let msgEle = document.createElement('div');
    msgEle.innerText = msg;
    msgEle.classList.add('message');
    msgEle.classList.add(position);
    messageDiv.append(msgEle);
    if (position=='left') {
        audio.play();
    }
}

const user_name = prompt('Enter your name');
socket.emit('new_user_joined', user_name);
// let user_name;

joinBtn.addEventListener('click', function() {
    joinBtn.disabled = true;
    sendBtn.disabled = false;
    leaveBtn.disabled = false;
    document.getElementById('email-id').value='';
});  


socket.on('user_joined', username => {
    appendfn(`${username} joined the chat`, 'left');
});

sendBtn.addEventListener('click',()=>{
    let msg=document.getElementById('messageInp').value;
    if (msg!='') {
        appendfn(`${msg}`, 'right');
        socket.emit('send',msg);
        document.getElementById('messageInp').value='';
    }
});

socket.on('receive', data => {
    appendfn(`${data.username} : ${data.message}`, 'left');
});

socket.on('user_left', username => {
    appendfn(`${username} left the chat`, 'left');
});

leaveBtn.addEventListener('click',()=>{
    socket.emit('disconnect');
})