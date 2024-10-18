const fs = require("fs");
const path = require("path");

// Construir la ruta correcta al archivo products.json
const productsPath = path.join(__dirname, "../products.json");

// Obtener todos los productos
const getAllProducts = (req, res) => {
  const limit = parseInt(req.query.limit);
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    if (limit) {
      return res.json(products.slice(0, limit));
    }
    res.json(products);
  } catch (error) {
    console.error("Error al leer los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Obtener producto por ID
const getProductById = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const product = products.find((p) => p.id === parseInt(req.params.pid));
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al leer los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Crear nuevo producto
const createProduct = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1, // Asegúrate de que el ID sea único
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || [],
    };

    products.push(newProduct);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Actualizar producto por ID
const updateProduct = (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const index = products.findIndex((p) => p.id === parseInt(req.params.pid));

    if (index === -1) {
      return res.status(404).send("Producto no encontrado");
    }

    const updatedProduct = {
      ...products[index],
      ...req.body,
      id: products[index].id,
    };

    products[index] = updatedProduct;
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Eliminar producto por ID
const deleteProduct = (req, res) => {
  try {
    let products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
    const newProducts = products.filter(
      (p) => p.id !== parseInt(req.params.pid)
    );

    if (newProducts.length === products.length) {
      return res.status(404).send("Producto no encontrado");
    }

    fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, 2));
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
