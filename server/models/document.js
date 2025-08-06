const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    versionHistory: [{
        content: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;