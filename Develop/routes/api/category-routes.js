const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: Product,
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id, {
      include: Product,
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await Category.update(req.body, {
      where: {
        id: id,
      },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json({ message: "Category updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rowsAffected = await Category.destroy({
      where: {
        id: id,
      },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
