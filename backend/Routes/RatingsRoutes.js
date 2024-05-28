const express = require('express');
const router = express.Router();
const { 
    createRatings,
    readAllRatings,
    readByUserRatings,
    readBySpuIdRatings,
    deleteRatings
} = require('../Controllers/RatingsController');

router.route('/',).get(readAllRatings).post(createRatings);
router.route('/spu/:spu_id').get(readBySpuIdRatings);
router.get('/user/:user_id', readByUserRatings);
router.delete('/:id', deleteRatings);

module.exports = router;