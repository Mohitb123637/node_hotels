const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    }, 
    price:{
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        enum: ["sweet", "spicy", "sour"],
        required: true,
    },
    isDrink:{
        type: Boolean,
        required: false,
    },
     ingredients:{
        type: [String],
        required: false,
     },
     num_sales:{
        type: Number,
        default: 0,
        required: false,
     }
})

const menuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = menuItem;