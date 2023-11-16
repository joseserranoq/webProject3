const express = require('express');
const cors = require('cors');
const { Socket } = require('socket.io');

//Rutas 
const indexRoute = require('../router/index');
const loginRoute = require('../router/loginRouter');
const formMakerRoute = require('../router/form-makerRouter');

class Server {

    constructor() {
        this.app  = express();
        this.port = 8081;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')(this.server)
        //const io = new Server(this.server);  
        this.paths = {
            index: '/',
            login: '/login/',
            formMaker: '/form-maker/'
        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        this.app.use( express.json() );


        // Directorio Público
        this.app.use( express.static('public') );

    }
    // Ingresa las rutas creadas en el constructor
    routes() { 
        this.app.use( this.paths.login, loginRoute );
        this.app.use( this.paths.formMaker, formMakerRoute );
        this.app.use( this.paths.index, indexRoute );
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;