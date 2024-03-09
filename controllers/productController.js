const Product = require('../models/Product');
const url = require('url');

// Devuelve todos los productos
const showProducts = async (req, res) => {
    try {
      const fullUrl = req.originalUrl;
      const parsedUrl = new URL(fullUrl, 'http://localhost:3000');
      const queryParams = parsedUrl.searchParams;
      const category = queryParams.get('category');
  
      let products;
      if (category) {
        // Filtrar productos por categoría
        products = await Product.find({ 'category': category });
      } else {
        products = await Product.find();
      }

    

    // Productos filtrados

    res.render('products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};

//  Devuelve el detalle de un producto
const showProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).send('Error al obtener el producto');
  }
};

// Mostrar producto
const showNewProductForm = (req, res) => {
  res.render('newProduct');
};

// Devuelve el formulario para subir un artículo nuevo.
const getNewProductForm = (req, res) => {
    res.send(`
      <h1>Crear Nuevo Producto</h1>
      <form action="/dashboard/new" method="POST">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" required><br>
        <label for="description">Descripción:</label>
        <input type="text" id="description" name="description" required><br>
        <label for="image">Imagen (URL):</label>
        <input type="text" id="image" name="image" required><br>
        <label for="category">Categoría:</label>
        <select id="category" name="category" required>
          <option value="Camisetas">Camisetas</option>
          <option value="Pantalones">Pantalones</option>
          <option value="Zapatos">Zapatos</option>
          <option value="Accesorios">Accesorios</option>
        </select><br>
        <label for="size">Talla:</label>
        <select id="size" name="size" required>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select><br>
        <label for="price">Precio:</label>
        <input type="number" id="price" name="price" required><br>
        <button type="submit">Crear Producto</button>
      </form>
    `);
  };
  

// Crea un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;

    // Devuelve el detalle de un producto en el dashboard.
    const newProduct = new Product({
      name,
      description,
      image,
      category,
      size,
      price
    });
    await newProduct.save();

    // Redireccionar 
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Devuelve el formulario para editar un producto.
const showEditProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('editProduct', { product });
  } catch (error) {
    res.status(500).send('Error al obtener el producto para editar');
  }
};

// Actualiza un producto
const updateProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    await Product.findByIdAndUpdate(req.params.productId, { name, description, image, category, size, price });
    res.redirect('/dashboard/' + req.params.productId);
  } catch (error) {
    res.status(500).send('Error al actualizar el producto');
  }
};

// Función para eliminar un producto por su ID
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;   
    await Product.findByIdAndDelete(productId);
    res.redirect('/products'); 
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).send('Error interno del servidor');
  }
};

// Función para mostrar el detalle de un producto en el dashboard
const showProductInDashboard = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('productDetailInDashboard', { product }); 
  } catch (error) {
    res.status(500).send('Error al obtener el producto para mostrar en el dashboard');
  }
};



module.exports = {
  showProducts,
  showProductById,
  showNewProductForm,
  getNewProductForm,
  createProduct,
  showEditProductForm,
  updateProduct,
  deleteProduct,
  showProductInDashboard
};