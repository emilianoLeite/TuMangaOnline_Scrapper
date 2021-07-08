"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ title: 'Express' });
});
exports.default = router;
//# sourceMappingURL=home.js.map