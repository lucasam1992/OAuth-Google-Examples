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
exports.authCallback = exports.auth = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleAuth_1 = require("../auth/googleAuth");
const googleClient = new google_auth_library_1.OAuth2Client(googleAuth_1.googleAuth.clientId, googleAuth_1.googleAuth.clientSecret, googleAuth_1.googleAuth.redirectURL);
function auth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorizeUrl = googleClient.generateAuthUrl({
            access_type: "online",
            prompt: "consent",
            scope: "https://www.googleapis.com/auth/userinfo.profile",
        });
        res.status(200).redirect(authorizeUrl);
    });
}
exports.auth = auth;
function authCallback(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { code } = req.query;
        if (!code) {
            return res.status(401).json({ message: "error" });
        }
        // Now that we have the code, use that to acquire tokens.
        const accessToken = yield googleClient.getToken(code.toString());
        const tokenInfo = yield googleClient.getTokenInfo((_a = accessToken.tokens.access_token) !== null && _a !== void 0 ? _a : "");
        googleClient.setCredentials(accessToken.tokens);
        const response = yield googleClient.request({
            url: "https://www.googleapis.com/oauth2/v1/userinfo",
        });
        res.status(200).json(response);
    });
}
exports.authCallback = authCallback;
