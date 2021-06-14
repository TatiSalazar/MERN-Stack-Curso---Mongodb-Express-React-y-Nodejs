//en esta parte se define nuestro modelo de datos 
//modelar los datos
const mongoose = require('mongoose'); 
//esquema permite definir el esquema de los datos, por ejemplo si vamos a crear una tarea, entonces esta tarea tendrá un titulo, descripcion, etc, todo esto se define dentro del esquema  
const {Schema} = mongoose;  

const TaskShema = new Schema ({
    title: {type: String, require: true},
    description: {type: String, require: true}
});

module.exports = mongoose.model('Task',TaskShema);
