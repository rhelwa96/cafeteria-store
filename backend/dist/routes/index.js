"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_routes_1 = __importDefault(require("./api/users.routes"));
// import productRoutes from './api/products.routes'
var orders_routes_1 = __importDefault(require("./api/orders.routes"));
var routes = (0, express_1.Router)();
routes.use('/users', users_routes_1.default);
// routes.use('/products',productRoutes)
routes.use('/orders', orders_routes_1.default);
exports.default = routes;
