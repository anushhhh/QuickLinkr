const express = require('express')
const router = express.Router()
const urlController = require('../controllers/urlController')

router.get('/', urlController.homepage);
router.get('/:shortId', urlController.goToURL);
router.post('/url', urlController.genShortURL);
router.get('/analytics/:shortId', urlController.getAnalytics);
module.exports = router