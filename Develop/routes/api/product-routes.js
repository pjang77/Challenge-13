const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, Tag],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id, {
      include: [Category, Tag],
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }
    res.status(200).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await Product.update(req.body, {
      where: {
        id: id,
      },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (req.body.tagIds && req.body.tagIds.length) {
      await ProductTag.destroy({
        where: { product_id: id },
      });

      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rowsAffected = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
