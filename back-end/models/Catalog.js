const mongoose = require('mongoose');

const CatalogSchema = new mongoose.Schema({
    name: String,
    url: { 
        type: String, 
        default: function() { 
            return this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''); 
        } 
    }
});

module.exports = mongoose.model('Catalog', CatalogSchema);

