import bcrypt from 'bcrypt';
import express from 'express';
import { Driver } from '../models/driver.js';
import { Order } from '../models/order.js';
import { APP_ERROR_MESSAGE, HTTP_RESPONSE_CODE, ORDER_STATUS } from '../constants/constant.js';

export class DriverController {
    path = '/driver';
    router = express.Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.post(this.path + '/register', this.register);
        this.router.post(this.path + '/login', this.login);
        this.router.get(this.path + '/deliveries', this.getDeliveries);
        this.router.post(this.path + '/delivery/:orderId/update', this.updateDeliveryStatus);
    }

    async register(req, res) {
        try {
            Driver
                .findOne({ username: req.body.username })
                .exec()
                .then(user => {
                    if (user) {
                        return res.status(HTTP_RESPONSE_CODE.CONFLICT).send({ error: APP_ERROR_MESSAGE.existedUser })
                    }
                    return;
                })
                .then(async () => {
                    const driver = Driver({
                        password: await bcrypt.hash(req.body.password, 10),
                        ...req.body
                    })
                    return driver.save();
                })
                .then(user => {
                    return user; //jwt or something here i forgot
                })
                .then(() => {
                    res.status(HTTP_RESPONSE_CODE.CREATED).send({ success: true, message: APP_ERROR_MESSAGE.createdUser })
                })
        } catch (error) {
            console.error(error);
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const driver = await Driver.findOne({ username }).exec();
            const isMatch = await bcrypt.compare(password, driver.password);
            
            if (isMatch) {
                return res.status(HTTP_RESPONSE_CODE.SUCCESS).send({ success: true, message: APP_ERROR_MESSAGE.userReturned });
            }
            return;
        } catch (error) {
            console.error(error);
        }
    }

    async getDeliveries(req, res) {
        try {
            const orders = await Order.find({ status: 'READY_FOR_DELIVERY' }).exec();
            if (orders) {
                return res.status(HTTP_RESPONSE_CODE.SUCCESS).send({ success: true, message: APP_ERROR_MESSAGE.ordersReturned, orders})
            }
            return res.status(HTTP_RESPONSE_CODE.NOT_FOUND).send({ success: false, message: APP_ERROR_MESSAGE.ordersNotFound });
        } catch (error) {
            console.error(error);
        }
    }

    async updateDeliveryStatus(req, res) {
        try {
            const { orderId } = req.params;
            await Order.findByIdAndUpdate({ _id: orderId }, {status: ORDER_STATUS.transit }).exec();
            return res.status(HTTP_RESPONSE_CODE.SUCCESS).send({ success: true, message: APP_ERROR_MESSAGE.orderUpdated });
        } catch (error) {
            console.error(error);
        }
    }
}