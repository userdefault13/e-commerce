const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET /api/tags
router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated product data
    const tags = await Tag.findAll({ include: Product });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET /api/tags/:id
router.get('/:id', async (req, res) => {
  try {
    // Find a tag by its ID and include associated product data
    const tag = await Tag.findByPk(req.params.id, { include: Product });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST /api/tags
router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT /api/tags/:id
router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its ID
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE /api/tags/:id
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its ID
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
