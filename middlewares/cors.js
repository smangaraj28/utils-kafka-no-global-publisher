'use strict';

const Config = global.Config;

module.exports = function (req, res, next) {
    let oneof = false;
    if (req.headers.origin && (Config.env !== 'production' || Config.allowedRequestOrigins.indexOf(req.headers.origin) !== -1)) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        oneof = true;
    }
    if (req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if (req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if (oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }
    res.header("Access-Control-Expose-Headers", "Content-Length, x-items-count");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-DNS-Prefetch-Control", "off");
    res.header("X-Frame-Options", "DENY");

    // intercept OPTIONS method
    if (oneof && req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};