const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');

router.get('/', badgeController.readAllBadges);
router.post('/', badgeController.createNewBadge, badgeController.readBadgeById);
router.get('/:badge_id', badgeController.readBadgeById);
router.put('/:badge_id', badgeController.updateBadgeById, badgeController.readBadgeById);
router.delete('/:badge_id',  badgeController.deleteBadgeById);

module.exports = router;