
import express from 'express';
import { Order } from '../models/order.js';
import { MenuItem } from '../models/menu-item.js';
import { HTTP_RESPONSE_CODE, APP_ERROR_MESSAGE } from '../constants/constant.js';

export class RestaurantController {
    path = '/restaurant'
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get(this.path, this.getMenu);
        this.router.get(this.path + '/order/:orderId', this.getItemsInOrder);
        this.router.post(this.path + '/order', this.saveOrder);
        // this.router
    }

    async getMenu(req, res) {
        try {
            const items = await MenuItem.find().exec();
            return res.status(HTTP_RESPONSE_CODE.SUCCESS).send({ success: true, message: APP_ERROR_MESSAGE.menuReturned, items })
        } catch (error) {
            console.error(error);
        }
    }

    async getItemsInOrder(req, res) {
        try {
            const { orderId } = req.params;
            const orderItems = await Order.findById({ _id: orderId }).exec();
            return res.status(HTTP_RESPONSE_CODE.SUCCESS).send({ success: true, message: APP_ERROR_MESSAGE.orderReturned, orderItems });
        } catch (error) {
            console.error(error);
        }
    }

    async saveOrder(req, res) {
        try {
            const order = Order({
                ...req.body
            });
            await order.save().exec();
            return res.stats(HTTP_RESPONSE_CODE.SUCCESS).send({ success: true, message: APP_ERROR_MESSAGE.createdOrder });
        } catch (error) {
            console.error(error);
        }
    }

    // async getOrdersByCustomer(req, res) {
    //     const user = req.user;
    // }
}