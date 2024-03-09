const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const productRoutes = require('./routes/ProductRoutes');
const connectDB = require('./config/db'); // Importar connectDB
const Product = require('./models/Product');

dotenv.config({ path: './.env' });

const app = express();


// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('pagina', './pagina'); 
app.use(methodOverride('_method'));


//conectar con la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conexión a la base de datos establecida');
}).catch(err => {
  console.error('Error al conectar a la base de datos:', err);
  process.exit(1);
});

//CSS
app.use(express.static('public'));


app.use('/', productRoutes);

// Middleware nav.menu 
app.use((req, res, next) => {
  res.locals.categories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'];
  next();
});


app.get('/', async (req, res) => {
  try {
      const products = await Product.find();

    // Lista de productos en html
    const productsList = products.map(product => `
      <li>
      <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>        
        <p>Precio: ${product.price}€</p>
        <button class="button" onclick="window.location.href='/dashboard/${product._id}'">Ver detalles</button>
      </li>
    `).join('');

    // enviar la lista de productos
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tienda de Ropa</title>
      </head>
      <body>
        <nav>
          <ul>
          <link rel="stylesheet" href="/styles.css">

            
            ${res.locals.categories.map(category => `<li><a href="/products?category=${encodeURIComponent(category)}">${category}</a></li>`).join('')}

            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
        <h1>DASHBOARD</h1>
        <ul>
          ${productsList}
        </ul>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Dashboard
app.get('/dashboard/', async (req, res) => {

  const products = await Product.find();

  // Productos
  const productsList = products.map(product => `
    <li>
    <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>           
      <p>Precio: ${product.price}€</p>
      <p>${product.description}</p> 
      <<button class="button" onclick="window.location.href='/dashboard/${product._id}'">Ver detalles</button>
      </li>
      </li>
      


  `).join('');
  
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tienda de Ropa</title>
    </head>
    <body>
      <nav>
        <ul>
          <li><a href="/products">Productos</a></li>
          ${res.locals.categories.map(category => `<li><a href="/products?category=${encodeURIComponent(category)}">${category}</a></li>`).join('')}
          <a href="/dashboard/${product._id}" class="button-link">Ver detalles</a>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
      <h1>Dashboard</h1>
      <ul>
          ${productsList}
        </ul>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});