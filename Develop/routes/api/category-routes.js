const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categories = await Category.findAll({
    include: Product,
  });
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByPk(id, {
    include: Product,
  });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedCategory = await Category.update(req.body, {
    where: {
      id: id,
    },
  });
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedCategory = await Category.destroy({
    where: {
      id: id,
    },
  });
  // delete a category by its `id` value
});

module.exports = router;
