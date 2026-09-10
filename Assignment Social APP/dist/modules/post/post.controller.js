"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const validation_middleware_1 = require("../../middleware/validation.middleware");
const postValidation = __importStar(require("./post.validation"));
const post_service_1 = require("./post.service");
const router = (0, express_1.Router)();
exports.routes = {
    base: "/posts",
    createPost: "/create-post",
    ShowpostsById: "/show-sposts/:id",
    homePage: "/",
};
router.post(exports.routes.createPost, auth_middleware_1.default, (0, validation_middleware_1.validation)(postValidation.postValidation), async (req, res) => {
    const userId = req.user._id;
    const body = req.body;
    const { data } = await post_service_1.postServices.createPost({ ...body, userId });
    return res.status(200).json(data);
});
router.post(exports.routes.ShowpostsById, auth_middleware_1.default, (0, validation_middleware_1.validation)(postValidation.getPostsByIdValidation), async (req, res) => {
    const user = req.user;
    const id = req.params.id;
    const { data } = await post_service_1.postServices.getPostsByUser({
        userId: id,
        user,
    });
    return res.status(200).json(data);
});
router.get(exports.routes.homePage, auth_middleware_1.default, async (req, res) => {
    const user = req.user;
    const { data } = await post_service_1.postServices.homePagePosts({ user });
    return res.status(200).json(data);
});
exports.default = router;
