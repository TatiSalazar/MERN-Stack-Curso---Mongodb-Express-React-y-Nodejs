const express = require('express');
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');
const app = express();

//settings
//CODIGO DE SERVIDOR EN NUESTRA MAQUINA
app.set('port', process.env.PORT || 3000);

//middlewares funcion que se ejecuta antes de las rutas
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks',require('./routes/task.routes'));


//Static files para decirle a express donde estaran los htmls 
app.use(express.static(path.join(__dirname, 'public')));





//servidor escucha en el puerto 3000
app.listen(app.get('port'), () => {
    //esta tarea se ejecuta
    console.log(`server on port ${app.get('port')}`);
});
