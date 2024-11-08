import express from 'express';
import { Order } from '../models/order.js';
import { HTTP_RESPONSE_CODE, ORDER_STATUS } from '../constants/constant.js';

export class TrackingController {
    path = '/tracking';
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(this.path + '/orders', this.getRestaurantOrders);
        this.router.post(this.path + '/order/:orderId/update', this.updateOrderStatus);
    }

    async getRestaurantOrders(req, res) {
        try {
            const items = await Order.find().sort({ date: -1 }).exec();
            res.send(items);
        } catch (error) {
            console.error(error);
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { orderId } = req.params;
            const { status } = req.body.status;
            if (!Object.values(ORDER_STATUS).includes(status.toUpperCase())) {
                return res.status(HTTP_RESPONSE_CODE.BAD_REQUEST).send({ success: false, message: 'Invalid status value' });
            }
            await Order.findByIdAndUpdate({ _id: orderId }, { status }).exec();
            res.status(204).send();
        } catch (error) {
            console.error(error);
        }
    }

    // async getOrdersByCustomer(req, res) {

    // }
}