const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')
const express = require('express')
const cars = require('./schema')
const cors = require('cors');

const app = express()

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/car', graphqlHTTP({schema:cars, pretty: true}))

app.listen(3000, function () {
  console.log('Servidor rodando para Live TC')
})