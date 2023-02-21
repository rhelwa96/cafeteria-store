"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var orderModel = /** @class */ (function () {
    function orderModel() {
    }
    orderModel.prototype.create = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO orders (user_id,order_name,price,order_status) values ($1,$2,$3,$4) returning user_id,order_name,price,created_at';
                        return [4 /*yield*/, conn.query(sql, [o.user_id, o.order_name, o.price, o.order_status])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Could not add new order ".concat(o.id, ". Error: ").concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.createMultiple = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, i, sql, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < o.length)) return [3 /*break*/, 5];
                        sql = 'INSERT INTO orders (user_id,order_name,price,order_status) values ($1,$2,$3,$4) returning user_id,order_name,price';
                        return [4 /*yield*/, conn.query(sql, [o[i].user_id, o[i].order_name, o[i].price, o[i].order_status])];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        conn.release();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        throw new Error("Could not add new orders. Error: ".concat(error_2));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.RetrieveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT users.id as users_id, users.full_name, users.email, users.floor_number, users.desk_number,users.department,orders.id,orders.order_name,orders.price,orders.created_at FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE orders.id IS NOT NULL AND orders.completed_at IS NULL ORDER BY orders.created_at::timestamptz DESC';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Error: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.RetrieveAllInactive = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT users.id as users_id, users.full_name, users.email, users.floor_number, users.desk_number,users.department,orders.id,orders.order_name,orders.price,orders.created_at FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE orders.id IS NOT NULL AND orders.completed_at IS NOT NULL ORDER BY orders.created_at::timestamptz DESC';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Error: ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.RetrieveUserHistory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT orders.id,orders.order_name,orders.price,orders,orders.created_at,completed_at FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE (users.id=($1) and orders.id IS NOT NULL) ORDER BY orders.created_at::timestamptz DESC';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ". Error: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.RetrieveSingle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders WHERE id=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.updateStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "UPDATE orders SET completed_at = NOW() WHERE id=($1) RETURNING *;";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Could not find order ".concat(id, ". Error: ").concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.updateSingle = function (o) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "UPDATE orders\n                SET user_id=$1,order_name=$2,price=$3\n                WHERE id=$6\n                RETURNING id,user_id,order_name,price";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [o.user_id, o.order_name, o.price, o.id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not find order ".concat((o.user_id, o.order_status, o.id), ". Error: ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderModel.prototype.deleteSingle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, order, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM orders WHERE id=($1)\n                RETURNING id,user_id,order_name,price";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        order = result.rows[0];
                        conn.release();
                        return [2 /*return*/, order];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not delete order ".concat(id, ". Error: ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return orderModel;
}());
exports.default = orderModel;
