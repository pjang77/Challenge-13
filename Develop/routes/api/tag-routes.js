const router = require("express").Router();
const { Tag, Product } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product,
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tag = await Tag.findByPk(id, {
      include: Product,
    });
    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [rowsAffected] = await Tag.update(req.body, {
      where: {
        id: id,
      },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json({ message: "Tag updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rowsAffected = await Tag.destroy({
      where: {
        id: id,
      },
    });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }
    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
