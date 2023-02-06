const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const dbCategories = await Category.findAll({
      include: Product
    });
    res.status(200).json(dbCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const dbCategory = await Category.findByPk(req.params.id, {
      include: Product
    });
    res.status(200).json(dbCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /* req.body should look like this:
    {
      category_name: "sports"
    }
  */
  try {
    await Category.create(req.body)
      .then((category) => {
        res.status(200).json(category);
      });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(`Updated category name to ${req.body.category_name}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(`Deleted category by id: ${req.params.id}`);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
