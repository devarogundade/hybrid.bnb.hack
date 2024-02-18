"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_cofig_1 = __importDefault(require("./configs/db.cofig"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
// origin: ""
};
app.use((0, cors_1.default)(corsOptions));
// parse requests of content-type - application/json
app.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
const route = new routes_1.default();
mongoose_1.default.connect(db_cofig_1.default.url)
    .then(() => {
    console.log("Connected to the database!");
    route.init(app);
})
    .catch((error) => {
    console.log("Cannot connect to the database!", error);
    process.exit();
});
app.get("/", (_, res) => {
    res.json({ message: "Hybrid Node V1" });
});
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`⚡ Server is on port ${PORT}.`);
});
