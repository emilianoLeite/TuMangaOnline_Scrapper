"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const config_1 = require("./config");
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use('/', routes_1.home);
app.use('/users', routes_1.users);
app.listen(config_1.config.PORT, () => {
    console.info(`(${config_1.config.NODE_ENV}) running on port ${config_1.config.PORT}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map