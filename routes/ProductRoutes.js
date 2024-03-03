const express = require('express')
const router = express.Router()
const Product = require ('../models/Product')


// Devuelve todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al obtener los productos' });
    }
});

// Devuelve el detalle de un producto por su ID
router.get('/products/:_id', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await productController.getProductById(productId);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al obtener el producto' });
    }
});


// Devuelve el dashboard del administrador
router.get('/dashboard', async (req, res) => {
    try {
        const dashboard = await productController.getDashboard();
        res.json(dashboard);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al obtener el dashboard' });
    }
});

// Devuelve el formulario para subir un artículo nuevo
router.get('/dashboard/new', async (req, res) => {
    try {
        const newProductForm = await productController.getNewProductForm();
        res.json(newProductForm);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al obtener el formulario para nuevo producto' });
    }
});

// Devuelve el detalle de un producto en el dashboard
router.get('/dashboard/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const productInDashboard = await productController.getProductByIdInDashboard(productId);
        res.json(productInDashboard);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al obtener el producto en el dashboard' });
    }
});

// Devuelve el formulario para editar un producto
router.get('/dashboard/:productId/edit', async (req, res) => {
    const productId = req.params.productId;
    try {
        const editProductForm = await productController.getEditProductForm(productId);
        res.json(editProductForm);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al obtener el formulario para editar producto' });
    }
});

// Crea un nuevo producto
router.post('/dashboard', async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await productController.createProduct(productData);
        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al crear un nuevo producto' });
    }
});

// Actualiza un producto
router.put('/dashboard/:productId', async (req, res) => {
    const productId = req.params.productId;
    const updatedProductData = req.body;
    try {
        const updatedProduct = await productController.updateProduct(productId, updatedProductData);
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al actualizar el producto' });
    }
});

// Elimina un producto
router.delete('/dashboard/:productId/delete', async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await productController.deleteProduct(productId);
        res.json(deletedProduct);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Error al eliminar el producto' });
    }
});




module.exports = router;