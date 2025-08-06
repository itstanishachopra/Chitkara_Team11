class DocumentController {
    constructor(Document) {
        this.Document = Document;
    }

    async createDocument(req, res) {
        try {
            const { title, content, author } = req.body;
            const newDocument = new this.Document({ title, content, author, versionHistory: [] });
            await newDocument.save();
            res.status(201).json(newDocument);
        } catch (error) {
            res.status(500).json({ message: 'Error creating document', error });
        }
    }

    async editDocument(req, res) {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const document = await this.Document.findById(id);
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }
            document.content = content;
            document.versionHistory.push({ content, editedAt: new Date() });
            await document.save();
            res.status(200).json(document);
        } catch (error) {
            res.status(500).json({ message: 'Error editing document', error });
        }
    }

    async saveDocument(req, res) {
        try {
            const { id } = req.params;
            const document = await this.Document.findById(id);
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }
            await document.save();
            res.status(200).json({ message: 'Document saved successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error saving document', error });
        }
    }

    async getDocument(req, res) {
        try {
            const { id } = req.params;
            const document = await this.Document.findById(id);
            if (!document) {
                return res.status(404).json({ message: 'Document not found' });
            }
            res.status(200).json(document);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving document', error });
        }
    }
}

module.exports = DocumentController;