import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({message: "Products listed", data: products});
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

//create a product
export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({message: "Product created", data: newProduct});
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Get single product by ID
export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({message: "Product details fetched", data: product});
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({message: "Product updated", data: updatedProduct});
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Delete products
export const deleteProducts = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "No product IDs provided" });
  }

  try {
    const result = await Product.deleteMany({ _id: { $in: ids } });

    res.json({
      message: `${result.deletedCount} product(s) deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Increment likedCount
export const incrementLikedCount = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { likedCount: 1 } },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Liked count incremented", data: product });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Decrement likedCount
export const decrementLikedCount = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.likedCount > 0) {
      product.likedCount -= 1;
      await product.save();
    }

    res.json({ message: "Liked count decremented", data: product });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};