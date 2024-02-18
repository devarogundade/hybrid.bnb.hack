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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
const controller = new controllers_1.MainController();
class Route {
    init(app) {
        router.post('/new-signedhash', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { owner, data } = req.query;
            const result = yield controller.newSignedMessage(owner, data);
            res.status(result.code).send(result);
        }));
        router.post('/new-bind', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { owner, email } = req.query;
            const result = yield controller.bindRequest(owner, email);
            res.status(result.code).send(result);
        }));
        router.post('/get-bind', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { owner } = req.query;
            const result = yield controller.getBinding(owner);
            res.status(result.code).send(result);
        }));
        router.post('/delete-bind', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { owner } = req.query;
            const result = yield controller.onDeleteBind(owner);
            res.status(result.code).send(result);
        }));
        app.use('/', router);
    }
}
exports.default = Route;
