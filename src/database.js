const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mern-task';
//darle la direccion a la base de datos a la que me voy a conectar
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.err(err));

module.exports = mongoose;