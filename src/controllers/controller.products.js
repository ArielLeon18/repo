const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controladorProductos = {

	listado: function (req, res){
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
        res.render("./products/listado", {productos: products});
    },

    crear: function (req, res){
        res.render("./products/crear");
    },

    almacenar: function (req,res){
        let datos = req.body;
		let idNuevoProducto = (products[products.length-1].id)+1;
        let imagenNuevoProducto = 'qqq.jpg';

		let nuevoProducto ={
			"id": idNuevoProducto,
			"name": datos.name,
			"price": parseInt(datos.price),
			"discount": parseInt(datos.discount),
			"category": datos.category,
			"description": datos.description,
			"image": imagenNuevoProducto
		};

		products.push(nuevoProducto);
		fs.writeFileSync(productsFilePath,JSON.stringify(products, null, " "),'utf-8');

		res.redirect('/');
    },

    detalle: function (req, res){

        let idProducto = req.params.id;

        let productoBuscado = null;

        for(let o of products){
            if(o.id == idProducto){
                productoBuscado=o;
                break;
            }
        }

        if(productoBuscado != null ){
            res.render('./products/detalle' , {producto: productoBuscado}); 
        }
		res.send('error al buscar producto');
    },

    editar: function (req, res){
        
        let idProducto = req.params.id;

        let productoBuscado = null;

        for(let o of products){
            if(o.id == idProducto){
                productoBuscado=o;
                break;
            }
        }

        if(productoBuscado != null ){
            res.render('./products/editar' , {producto: productoBuscado}); 
        }
		res.send('error al buscar producto');
    },

    actualizar: function(req, res){

        let idProducto = req.params.id;

        let datosProducto = req.body;

        for (let o of products){
            if( o.id == idProducto){
                o.name = datosProducto.name;
                o.price = datosProducto.price;
                o.discount = datosProducto.discount;
                o.category = datosProducto.category;
                o.description = datosProducto.description;
                break;
            }
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ""), 'utf-8');

        res.redirect('/');
    },

    borrar: function(req,res){

        let idProductoX = req.params.id;

        let nuevaListadeProductos = products.filter(function(e){
            return e.id != idProductoX;
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(nuevaListadeProductos, null, ""), 'utf-8');

        res.redirect('/');

    },

	carrito: function (req, res){
        res.render("./products/carrito");
    },

}

//Exportar

module.exports = controladorProductos