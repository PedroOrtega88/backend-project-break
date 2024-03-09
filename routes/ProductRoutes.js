const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Devuelve la vista con todos los productos.

router.get('/products', productController.showProducts);
  
// Devuelve la vista con el detalle de un producto.

router.get('/products/:productId', productController.showProductById);

// Ruta para mostrar el formulario para crear un nuevo producto
router.get('/dashboard/new', productController.getNewProductForm);

// Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.

router.post('/dashboard/new', productController.createProduct);



// Devuelve la vista con el formulario para editar un producto.

router.get('/dashboard/:productId/edit', productController.showEditProductForm);

// Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
router.put('/dashboard/:productId/update', productController.updateProduct);



// Ruta para mostrar el detalle de un producto en el dashboard
router.get('/dashboard/:productId', productController.showProductInDashboard);

// Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.


router.delete('/dashboard/:productId/delete', productController.deleteProduct);

module.exports = router;