const express = require("express");
const router = express.Router();
const cartsController = require("../controllers/cartsController");

// Crear un nuevo carrito
router.post("/", cartsController.createCart);

// Obtener productos de un carrito por ID
router.get("/:cid", cartsController.getCartProducts);

// Agregar producto a un carrito
router.post("/:cid/product/:pid", cartsController.addProductToCart);

module.exports = router;
