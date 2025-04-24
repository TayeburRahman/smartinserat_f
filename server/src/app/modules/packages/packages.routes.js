const express = require('express');
const { PackagesContoller } = require('./packages.controller');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/createPackage', PackagesContoller.AddProduct);
router.get('/getAllPackages', PackagesContoller.GetAllProducts);

module.exports = router;
