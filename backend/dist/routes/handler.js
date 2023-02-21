"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/tweets', function (req, res) {
    var str = [
        {
            "drink": "1 Turkish Coffee",
            "price": "20 L.E",
            "date": "16-11-2022"
        },
        {
            "drink": "1 tea",
            "price": "10 L.E",
            "date": "19-11-2022"
        },
        {
            "drink": "1 minit",
            "price": "10 L.E",
            "date": "16-11-2022"
        }
    ];
    res.end(JSON.stringify(str));
});
router.post('/addTweet', function (req, res) {
    res.end('NA');
});
exports.default = router;
