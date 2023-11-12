const socketController = ( socket ) => {            
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    socket.on('send-message', ( payload, callback ) => {
        //console.log(payload);

        const id = 123456;
        callback( {id,date: new Date().getTime()} );

        // Emite a todos
        //this.io.emit('send-message', payload); 
        //socket.emit('send-message', payload); // Emite a uno
        socket.broadcast.emit('send-message', payload); // Emite a todos menos al que lo emitió
    })

};

module.exports = {
    socketController
}