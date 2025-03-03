"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentification = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const authentification = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const token = header.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    req[" currentUser"] = decode;
    next();
};
exports.authentification = authentification;
