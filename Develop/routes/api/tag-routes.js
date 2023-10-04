const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const tags = await Tag.findAll({
    include: Product,
  });
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findByPk(id, {
    include: Product,
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  await Tag.update(req.body, {
    where: {
      id: id,
    },
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Tag.destroy({
    where: {
      id: id,
    },
  });
  // delete on tag by its `id` value
});

module.exports = router;
