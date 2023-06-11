const router = require('express').Router();
const { ProductTag, Product, Tag } = require('../../models');

// GET /api/product-tags
router.get('/', async (req, res) => {
  try {
    // Find all product tags and include associated product and tag data
    const productTags = await ProductTag.findAll({
      include: [{ model: Product }, { model: Tag }],
    });
    res.json(productTags);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET /api/product-tags/:id
router.get('/:id', async (req, res) => {
  try {
    // Find a product tag by its ID and include associated product and tag data
    const productTag = await ProductTag.findByPk(req.params.id, {
      include: [{ model: Product }, { model: Tag }],
    });
    if (!productTag) {
      res.status(404).json({ message: 'Product tag not found' });
      return;
    }
    res.json(productTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST /api/product-tags
router.post('/', async (req, res) => {
  try {
    // Create a new product tag
    const productTag = await ProductTag.create(req.body);
    res.status(201).json(productTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT /api/product-tags/:id
router.put('/:id', async (req, res) => {
  try {
    // Update a product tag by its ID
    const updatedProductTag = await ProductTag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedProductTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE /api/product-tags/:id
router.delete('/:id', async (req, res) => {
  try {
    // Delete a product tag by its ID
    const deletedProductTag = await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedProductTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
