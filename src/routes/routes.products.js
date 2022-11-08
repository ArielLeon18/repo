const multer = require('multer');
const express = require ('express');
const path = require('path');
const controladorProductos = require('../controllers/controller.products.js');
const router = express.Router();

const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,'../../public/images/productos'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
     cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });



//Rutas

//MUESTRA LA VISTA DE TODOS LOS PRODUCTOS
router.get("/", controladorProductos.listado)

//CREAR UN PRODUCTO
router.get('/crear', controladorProductos.crear)
router.post("/crear",controladorProductos.almacenar)   //,uploadFile.single('newimage'),

// VER UN PRODUCTO
router.get("/detalle/:id", controladorProductos.detalle)

// EDITAR UN PRODUCTO
router.get("/editar/:id", controladorProductos.editar)
router.put('/editar/:id', controladorProductos.actualizar); ///////////////////////////////////

// ELIMINAR PRODUCTO

router.delete('/:id' , controladorProductos.borrar)

// PRODUCTOS SELECCIONADOS
router.get("/carrito", controladorProductos.carrito)



// ELIMINAR UN PRODUCTO
// // // // // // // // // // router.delete('/:id', productsController.destroy); 


//Exportar
module.exports = router;