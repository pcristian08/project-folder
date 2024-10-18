const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

// Obtener todos los productos (con límite opcional)
router.get("/", productsController.getAllProducts);

// Obtener un producto por ID
router.get("/:pid", productsController.getProductById);

// Crear un nuevo producto
router.post("/", productsController.createProduct);

// Actualizar un producto por ID
router.put("/:pid", productsController.updateProduct);

// Eliminar un producto por ID
router.delete("/:pid", productsController.deleteProduct);

module.exports = router;
