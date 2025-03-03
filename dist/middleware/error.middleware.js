"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error(error); // Log lỗi để debug
    return res.status(500).json({ message: "Internal server error" });
};
exports.errorHandler = errorHandler;
