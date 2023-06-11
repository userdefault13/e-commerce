const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    // Find a product by its ID and include associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    // Create a new product
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    // Update a product by its ID
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    // Delete a product by its ID
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
