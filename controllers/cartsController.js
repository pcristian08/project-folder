const fs = require("fs");
const path = require("path");

// Construir la ruta correcta al archivo carts.json
const cartsPath = path.join(__dirname, "../carts.json");

// Crear carrito nuevo
const createCart = (req, res) => {
  try {
    const carts = JSON.parse(fs.readFileSync(cartsPath, "utf-8"));
    const newCart = {
      id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1, // Asegurarse de que el ID sea único
      products: [],
    };
    carts.push(newCart);
    fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
  } catch (error) {
    console.error("Error al crear el carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Obtener productos de un carrito por ID
const getCartProducts = (req, res) => {
  try {
    const carts = JSON.parse(fs.readFileSync(cartsPath, "utf-8")); // Leer desde cartsPath
    const cartId = parseInt(req.params.cid);

    const cart = carts.find((c) => c.id === parseInt(cartId));

    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Agregar producto a un carrito
const addProductToCart = (req, res) => {
  try {
    const carts = JSON.parse(fs.readFileSync(cartsPath, "utf-8"));
    const cart = carts.find((c) => c.id === parseInt(req.params.cid)); // Convertir a número

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    const product = cart.products.find(
      (p) => p.product === parseInt(req.params.pid)
    ); // Convertir a número
    if (product) {
      product.quantity += 1; // Incrementar la cantidad
    } else {
      cart.products.push({ product: parseInt(req.params.pid), quantity: 1 }); // Convertir a número
    }

    fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = {
  createCart,
  getCartProducts,
  addProductToCart,
};
