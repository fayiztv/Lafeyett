import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//create a product
export const createProduct = async (req, res) => {
  if (req.query.key !== process.env.ADMIN_KEY)
    return res.status(401).send("Unauthorized");

  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  if (req.query.key !== process.env.ADMIN_KEY)
    return res.status(401).send("Unauthorized");

  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};