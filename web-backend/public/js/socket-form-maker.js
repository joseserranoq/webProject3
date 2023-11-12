//Referencias del html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');


const socket = io();
 
socket.on('connect', () => {
    console.log('Conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';


});

socket.on('disconnect', () => {
    console.log('Desconectado');
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

socket.on('send-message', (payload) => {
    console.log(payload);

})

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    console.log(message);
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()
    }
    socket.emit('send-message', payload, (id) => {
        console.log('Desde el server', id);
    });
});