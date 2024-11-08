import mongoose from 'mongoose';
import { menuItemSchema } from './menu-item.js';
import { ORDER_STATUS } from '../constants/constant.js';

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String,
        required: true 
    },
    deliveryAddress: { 
        type: String, 
        required: true 
    },
    items: [menuItemSchema],
    date: { 
        type: Date, 
        default: Date.now,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(ORDER_STATUS),
        default: ORDER_STATUS.ready,
    },
})

export const Order = mongoose.model('Order', orderSchema);