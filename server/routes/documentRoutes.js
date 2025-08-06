const express = require('express');
const DocumentController = require('../controllers/documentController');
const Document = require('../models/document'); // Add this line

const router = express.Router();
const documentController = new DocumentController(Document); // Pass Document model

router.post('/', documentController.createDocument.bind(documentController));
router.put('/:id', documentController.editDocument.bind(documentController));
router.get('/:id', documentController.getDocument.bind(documentController));
router.post('/:id/save', documentController.saveDocument.bind(documentController));

module.exports = router;