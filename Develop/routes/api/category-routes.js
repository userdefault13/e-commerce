const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET /api/categories
router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated products
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET /api/categories/:id
router.get('/:id', async (req, res) => {
  try {
    // Find a category by its ID and include associated products
    const category = await Category.findByPk(req.params.id, { include: Product });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST /api/categories
router.post('/', async (req, res) => {
  try {
    // Create a new category
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT /api/categories/:id
router.put('/:id', async (req, res) => {
  try {
    // Update a category by its ID
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE /api/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its ID
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
