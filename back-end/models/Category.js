const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: String,
    url: { 
        type: String, 
        default: function() { 
            return this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''); 
        } 
    },
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog'
    }
});

module.exports  = mongoose.model('Category', CategorySchema);
