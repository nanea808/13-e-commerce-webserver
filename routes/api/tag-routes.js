const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const dbTags = await Tag.findAll({
      include: Product,
      attributes: { exclude: ['product_id'] }
    });
    res.status(200).json(dbTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const dbTag = await Tag.findByPk(req.params.id, {
      include: Product,
      attributes: { exclude: ['product_id'] }
    });
    res.status(200).json(dbTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this:
    {
      tag_name: "sports"
    }
  */
  try {
    await Tag.create(req.body)
      .then((tag) => {
        res.status(200).json(tag);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then((tag) => {
        res.status(200).json(tag);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((tag) => {
        res.status(200).json(tag);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
