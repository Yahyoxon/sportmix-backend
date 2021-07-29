const router = require("express").Router();
const User = require("../models/userModel");
const Product = require("../models/productModel");

//CREATE POST
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
   
    console.log(err)
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        res.status(500).json(err);
      }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
      try {
        await product.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let products;
    if (username) {
        products = await Product.find({ username });
    } else if (catName) {
        products = await Product.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
        products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;