const router = require("express").Router();
const Brand = require("../models/brandModel");

router.post("/", async (req, res) => {
  const newBrand = new Brand(req.body);
  try {
    const savedBrand = await newBrand.save();
    res.status(200).json(savedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).json(brands);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const brands = await Brand.findById(req.params.id);
        try {
          await brands.delete();
          res.status(200).json("Brand has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;