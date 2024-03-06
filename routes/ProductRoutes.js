const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para mostrar todos los productos
router.get('/products', productController.showProducts);
  
// Ruta para mostrar el detalle de un producto por su ID
router.get('/products/:productId', productController.showProductById);

// Ruta para mostrar el formulario para crear un nuevo producto y manejar la creación
router.route('/dashboard/new')
  .get(productController.showNewProductForm)
  .post(productController.createProduct);

// Ruta para mostrar el formulario de edición de un producto por su ID
router.get('/dashboard/:productId/edit', productController.showEditProductForm);

// Ruta para actualizar un producto por su ID
router.put('/dashboard/:productId/update', productController.updateProduct);

// Ruta para mostrar el detalle de un producto en el dashboard
router.get('/dashboard/:productId', productController.showProductInDashboard);

// Ruta para eliminar un producto por su ID
router.delete('/dashboard/:productId/delete', productController.deleteProduct);

module.exports = router;
