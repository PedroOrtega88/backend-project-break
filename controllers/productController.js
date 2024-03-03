const Product = require('../models/Product');
const url = require('url');

// Función para mostrar todos los productos
const showProducts = async (req, res) => {
  try {
    const fullUrl = req.originalUrl;
    console.log('URL completa:', fullUrl);

    // Analizar la URL para obtener los parámetros de consulta
    const parsedUrl = new URL(fullUrl, 'http://localhost:3000');
    const queryParams = parsedUrl.searchParams;
    console.log('Parámetros de consulta:', queryParams.toString());

    // Extraer el parámetro "category" de los parámetros de consulta
    const category = queryParams.get('category');
    console.log('Categoría:', category);

    if (category) {
      const products = await Product.find({ 'category': category });
      res.render('products', { products });
    } else {
      const products = await Product.find();
      res.render('products', { products });
    }

    

    // Renderizar la vista con los productos filtrados

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los productos');
  }
};


// Función para mostrar el detalle de un producto por su ID
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

// Función para mostrar el formulario de creación de un nuevo producto
const showNewProductForm = (req, res) => {
  res.render('newProduct');
};

// Función para mostrar el formulario para crear un nuevo producto
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
  

// Función para manejar la creación de un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;

    // Crear un nuevo producto con los datos del formulario
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

// Función para mostrar el formulario de edición de un producto por su ID
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

// Función para actualizar un producto por su ID
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