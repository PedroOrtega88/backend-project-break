const Product = require('../models/Product');

// Función para obtener la vista con todos los productos
const showProducts = async (req, res) => {
    try {
        const products = await Product.find();
        const productCards = getProductCards(products);
        const html = baseHtml + getNavBar() + productCards;
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
};

// Función para obtener la vista con el detalle de un producto por su ID
const showProductById = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const html = generateProductDetailHTML(product);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el detalle del producto');
    }
};

// Función para obtener la vista con el formulario para subir un nuevo producto
const showNewProduct = async (req, res) => {
    try {
        const html = generateNewProductFormHTML();
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el formulario para un nuevo producto');
    }
};

// Función para crear un nuevo producto
const createProduct = async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        res.redirect(`/products/${newProduct._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear un nuevo producto');
    }
};

// Función para obtener la vista con el formulario para editar un producto por su ID
const showEditProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        const html = generateEditProductFormHTML(product);
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el formulario para editar un producto');
    }
};

// Función para actualizar un producto por su ID
const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const updatedProductData = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
        res.redirect(`/products/${updatedProduct._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el producto');
    }
};

// Función para eliminar un producto por su ID
const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el producto');
    }
};

// Función para generar el HTML de las tarjetas de productos
const getProductCards = (products) => {
    let html = '';
    for (let product of products) {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>${product.price}€</p>
                <a href="/products/${product._id}">Ver detalle</a>
            </div>
        `;
    }
    return html;
};

// Función para generar el HTML del formulario para subir un nuevo producto
const generateNewProductFormHTML = () => {
    // Aquí podrías retornar el formulario HTML para crear un nuevo producto
};

// Función para generar el HTML del formulario para editar un producto
const generateEditProductFormHTML = (product) => {
    // Aquí podrías retornar el formulario HTML prellenado con los datos del producto
};

// Función para generar el HTML del detalle de un producto
const generateProductDetailHTML = (product) => {
    // Aquí podrías retornar el HTML con el detalle completo del producto
};

module.exports = {
    showProducts,
    showProductById,
    showNewProduct,
    createProduct,
    showEditProduct,
    updateProduct,
    deleteProduct
};
