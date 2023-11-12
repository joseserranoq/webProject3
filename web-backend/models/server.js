const express = require('express');
const cors = require('cors');
const { Socket } = require('socket.io');

//Rutas 
const indexRoute = require('../router/index');
const homepageRoute = require('../router/homepageRouter');
//const formMakerRoute = require('../router/form-makerRouter');
const formMakerRoute = require('../router/form-makerRouter');
const { socketController } = require('../controllers/sockets/socketController-formMaker');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')(this.server)
        //const io = new Server(this.server);  
        this.paths = {
            index: '/',
            homepage: '/homepage/',
            //formMaker: '/form-maker/'
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        //this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }
    // Ingresa las rutas creadas en el constructor
    routes() { 
        this.app.use( this.paths.homepage, homepageRoute );
        //this.app.use( this.paths.formMaker, formMakerRoute ); va como socket
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;