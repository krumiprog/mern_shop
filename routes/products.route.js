const router = require('express').Router();
const {
  create,
  getAll,
  deleteOne,
} = require('../controllers/product.controller');

router.post('/', create);
router.get('/', getAll);
router.delete('/:id', deleteOne);

module.exports = router;
