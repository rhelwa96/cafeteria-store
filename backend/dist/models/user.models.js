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
var bcrypt_1 = __importDefault(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var config_1 = __importDefault(require("../config"));
var DigestPasword = function (p) {
    var s = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync("".concat(p).concat(config_1.default.pepper), s);
};
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.create = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'INSERT INTO users (user_id,full_name,email,password_digest,user_role,floor_number,desk_number,department) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id,full_name,user_role,floor_number,desk_number,department';
                        return [4 /*yield*/, conn.query(sql, [u.user_id, u.full_name, u.email, DigestPasword(u.password_digest), u.user_role, u.floor_number, u.desk_number, u.department])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Could not add new user ".concat(u.full_name, ". Error: ").concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.RetrieveAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT id,user_id,full_name,email,user_role,floor_number,desk_number,department FROM users';
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
    UserModel.prototype.RetrieveSingle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT user_id,full_name,email,password_digest,user_role,floor_number,desk_number,department FROM users WHERE id=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.findOne = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT id,email FROM users WHERE email=($1)';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        throw new Error("Could not find user ".concat(email, ". Error: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.RetrieveBalance = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT COALESCE (SUM(orders.price), 0) FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE (users.id=$1) AND (((created_at >= (SELECT date_trunc(\'day\', date_trunc (\'month\', current_timestamp - interval \'1\' month)+ interval \'22\' day)) AND created_at< (SELECT date_trunc(\'day\', date_trunc(\'month\', current_timestamp)+ interval \'22\' day))) AND (SELECT date_part (\'day\', (SELECT current_timestamp)+ interval \'0\' day))<22 ) OR (created_at >= (SELECT date_trunc (\'day\', date_trunc (\'month\', current_timestamp)+ interval \'21\' day)) AND (SELECT date_part (\'day\', (SELECT current_timestamp)+ interval \'0\' day))>=22  ))';
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
                        throw new Error("Could not find user ".concat(id, ". Error: ").concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.RetrieveMutipleBalance = function (datefrom, dateto) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT users.full_name,users.user_id as ID, SUM(price) FROM users FULL OUTER JOIN orders ON users.id=orders.user_id WHERE created_at>=$1 AND created_at<$2 GROUP BY users.id';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [datefrom, dateto])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_5 = _a.sent();
                        throw new Error("Date From & Date To Error: ".concat(err_5));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.updateSingle = function (u) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "UPDATE users\n                SET password_digest=$1\n                WHERE id=$2\n                RETURNING id,full_name,user_role,floor_number";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [
                                DigestPasword(u.password_digest),
                                u.id
                            ])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_6 = _a.sent();
                        throw new Error("Could not find user ".concat(u.full_name, ". Error: ").concat(err_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.deleteSingle = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, user, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = "DELETE FROM users WHERE id=($1)\n                RETURNING id,full_name,user_role";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        user = result.rows[0];
                        conn.release();
                        return [2 /*return*/, user];
                    case 3:
                        err_7 = _a.sent();
                        throw new Error("Could not delete user ".concat(id, ". Error: ").concat(err_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.authenticateUser = function (e, password_digest) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, hash, isValid, info, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        sql = "SELECT password_digest FROM users where email=$1";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [e])];
                    case 2:
                        result = _a.sent();
                        if (!result.rows.length) return [3 /*break*/, 4];
                        hash = result.rows[0].password_digest;
                        isValid = bcrypt_1.default.compareSync("".concat(password_digest).concat(config_1.default.pepper), hash);
                        if (!isValid) return [3 /*break*/, 4];
                        return [4 /*yield*/, conn.query('SELECT id,full_name,user_role,user_id FROM users where email=($1)', [e])];
                    case 3:
                        info = _a.sent();
                        conn.release();
                        return [2 /*return*/, info.rows[0]];
                    case 4:
                        conn.release();
                        return [2 /*return*/, null];
                    case 5:
                        err_8 = _a.sent();
                        throw new Error("Could not authenticate! Error: ".concat(err_8));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.default = UserModel;
