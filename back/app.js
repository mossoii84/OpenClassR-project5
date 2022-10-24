const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');

const app = express();

// next(); //передает выполнение  следующему промежуточному ПО
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// запускаем этим адресом 
app.use('/api/products', productRoutes);

//такой путь у поиска по id
// http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926

module.exports = app;
//для запуска - npm run dev

// для примера
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next(); //передает выполнение  следующему промежуточному ПО
});
app.use((req, res, next) => {
  res.status(201);
  next(); //передает выполнение  следующему промежуточному ПО
});
