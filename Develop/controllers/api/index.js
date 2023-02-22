const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const opinionRoutes = require('./opinionRoutes');

router.use('/user', userRoutes);
router.use('/user', commentRoutes);
router.use('/user', opinionRoutes);

module.exports = router;