"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTweet = (link) => {
    const updatedLink = link.replace("x.com", "twitter.com");
    return updatedLink;
};
exports.default = getTweet;
