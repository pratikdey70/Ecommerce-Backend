const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }, 
    password: String,
    cart: [{
        id:{
            type: Schema.Types.ObjectId,
            required: true,
            ref:"products"
        },
        quantity: Number
    }],
    orders:[{
        product: {},
        quantity: Number,
        price: Number
    }],
    role:{
        type: String,
        default: "user"
    }
})

module.exports = mongoose.model('user', userSchema);

let users = [
    {
        "name": "Pratik",
        "email": "pratik@gmail.com",
        "password": 123456,
        "cart": []
    },
    {
        "name": "Lokesh",
        "email": "lokesh@gmail.com",
        "password": 789567,
        "cart": []
    },
    {
        "name": "Raman",
        "email": "raman@gmail.com",
        "password": 987354,
        "cart": []
    },
]