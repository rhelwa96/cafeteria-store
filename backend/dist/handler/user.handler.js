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
exports.updateSingle = exports.balance = exports.RetrieveSingle = exports.RetrieveMultipleBalance = exports.RetrieveAll = exports.deleteSingle = exports.create = exports.resetPassword = exports.forgetPassword = exports.authenticate = void 0;
var user_models_1 = __importDefault(require("../models/user.models"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config"));
// import axios from 'axios'
var user_Model = new user_models_1.default();
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var u, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.authenticateUser(req.body.email, req.body.password_digest)];
            case 1:
                u = _a.sent();
                if (!u) {
                    return [2 /*return*/, res.json({ status: "Email/password incorrect" })];
                }
                return [2 /*return*/, res.status(200).send({ "token": jsonwebtoken_1.default.sign(u, config_1.default.token) })
                    // } 
                    // else {
                    //    return res.json({status:"Captcha Failed: Refresh page then Try again"})
                    // }
                ];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.authenticate = authenticate;
var forgetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, link, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.findOne(req.body.email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.json({ status: "Email doesnt exist, please check with IT department" })];
                }
                token = jsonwebtoken_1.default.sign(user, config_1.default.token, {
                    expiresIn: "45m"
                });
                link = ("http://localhost:3000/".concat(token));
                return [2 /*return*/, res.status(200).json({ status: link })
                    // } else {
                    //    return res.json({status:"Captcha Failed: Refresh page then Try again"})
                    // }
                ];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.forgetPassword = forgetPassword;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, token, u, verify;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, id = _a.id, token = _a.token;
                return [4 /*yield*/, user_Model.RetrieveSingle(id)];
            case 1:
                u = _b.sent();
                if (!u) {
                    return [2 /*return*/, res.json({ status: "User does not exist" })];
                }
                // res.status(200).send({"token":jwt.sign(u,config.token as unknown as string)}) 
                try {
                    verify = jsonwebtoken_1.default.verify(token, config_1.default.token);
                    return [2 /*return*/, res.send("Verified")];
                }
                catch (err) {
                    return [2 /*return*/, res.send("Not Verified")];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.create(req.body)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var deleteSingle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.deleteSingle(req.params.id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_4)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteSingle = deleteSingle;
var RetrieveAll = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.RetrieveAll()];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_5)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.RetrieveAll = RetrieveAll;
var RetrieveMultipleBalance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.RetrieveMutipleBalance(req.params.datefrom, req.params.dateto)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_6)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.RetrieveMultipleBalance = RetrieveMultipleBalance;
var RetrieveSingle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.RetrieveSingle(req.params.id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_7 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_7)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.RetrieveSingle = RetrieveSingle;
var balance = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.RetrieveBalance(req.params.id)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_8 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_8)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.balance = balance;
var updateSingle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_Model.updateSingle(req.body)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, res.status(200).json(user)];
            case 2:
                err_9 = _a.sent();
                return [2 /*return*/, res.status(400).json(err_9)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateSingle = updateSingle;
