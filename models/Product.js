const mongoose = require('mongoose');

// Definir el esquema del producto
const ProductSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    categoria: {
        type: String,
        enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios']
    },
    talla: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL']
    },
    precio: Number
    
}, { timestamps: true });

// Crear el modelo de Producto
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

