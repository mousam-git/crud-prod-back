const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res, next) => {
  try {
    const productsRes = await Product.find();

    return res.status(200).json({
      success: true,
      count: productsRes.length,
      data: productsRes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, data: "Server Error" });
  }
};

// POST add product
exports.addProduct = async (req, res, next) => {
  try {
    const { name, image, price } = req.body;
    const productAdded = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      data: productAdded,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ status: false, error: message });
    } else {
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  }
};

// Update Product
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "No product with the given id found",
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ status: false, data: "Server Error" });
  }
};

// Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "No product with the given id found",
      });
    }

    await product.remove();

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
