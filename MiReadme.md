# Documentación del Proyecto

## Características de los archivos

Este proyecto tiene como objetivo crear una  tienda de ropa. La aplicación contará con un catálogo de productos que los usuarios podrán explorar, así como un panel de administración para que los propietarios de la tienda puedan gestionar su inventario.

.
├── src
│ ├── config
│ │ ├── db.js
│ │ └── firebase.js (BONUS)
│ ├── controllers
│ │ ├── productController.js
│ │ └──authController.js (BONUS)
│ ├── models
│ │ └── Product.js
│ ├── routes
│ │ └── productRoutes.js
│ │ └── authRoutes.js (BONUS)
│ ├── middlewares (BONUS)
│ │ └── authMiddleware.js
│ └── index.js
├── test (BONUS)
│ └── productController.test.js
├── public
│ ├── styles.css
│ └── images (OPCIONAL)
├── .env
└── package.json


El proyecto se divide en varias carpetas principales:

- **src**: Contiene el código fuente de la aplicación.
  - **config**: Archivos de configuración para la base de datos y otros servicios.
  - **controllers**: Controladores que manejan las solicitudes HTTP y la lógica de negocio.
  - **models**: Definición de los modelos de datos utilizando Mongoose.
  - **routes**: Definición de las rutas HTTP de la aplicación.
  - **middlewares**: Middlewares para manejar aspectos como la autenticación.
  - **index.js**: Archivo principal que inicia el servidor Express y define las rutas.

- **test**: Contiene los archivos de prueba para el código fuente (solo si se implementan).(no realizado)
- **public**: Contiene los css.
- **.env**: Archivo que contiene variables de entorno como la URI de la base de datos.
- **package.json**: Archivo de configuración de npm que lista las dependencias del proyecto y los scripts de inicio.

## Creación de base de datos

El proyecto utiliza una base de datos MongoDB alojada en Atlas. Se necesita crear una base de datos en Atlas y obtener la URI de conexión. Luego, se debe colocar esta URI en el archivo `.env` del proyecto con la clave `MONGO_URI`.

dotenv
MONGO_URI=<uri_bd_atlas>



## Características de los archivos

Este proyecto tiene como objetivo crear una  tienda de ropa. La aplicación contará con un catálogo de productos que los usuarios podrán explorar, así como un panel de administración para que los propietarios de la tienda puedan gestionar su inventario.





## Creación de base de datos

El proyecto utiliza una base de datos MongoDB alojada en Atlas. Se necesita crear una base de datos en Atlas y obtener la URI de conexión. Luego, se debe colocar esta URI en el archivo `.env` del proyecto con la clave `MONGO_URI`.

dotenv
MONGO_URI=<uri_bd_atlas>


## Creación del servidor

El servidor de la aplicación se crea utilizando Express.js. El archivo principal index.js se encarga de iniciar el servidor y definir las rutas y middlewares necesarios.const express = require('express');

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/ProductRoutes');


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

```

## Creación de modelo
El modelo de datos se define utilizando Mongoose en el archivo Product.js dentro de la carpeta models. Este modelo define la estructura de los productos en la base de datos.

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
    
    
  })
  
    
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
    
      
    
   ```
    
    
   ##  Creación de rutas
Las rutas HTTP de la aplicación se definen en archivos separados dentro de la carpeta routes. Por ejemplo, las rutas relacionadas con los productos se definen en productRoutes.js.

```javascript
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);
// Más rutas...

module.exports = router;

```

  ## Creación de controladores
Los controladores son responsables de manejar las solicitudes HTTP y ejecutar la lógica de negocio correspondiente. En este proyecto, los controladores se definen en archivos dentro de la carpeta controllers. Por ejemplo, el controlador de productos se define en productController.js.
```javascript
const Product = require('../models/Product');

exports.showProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

```
  ## Creación de controladores

  Creacion de CSS




  ## Despues se desplegara en FLo

  Despues se desplagará en FLO para poder subirlo a un servidor.