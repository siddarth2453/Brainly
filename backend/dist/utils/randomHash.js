"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomHash = (len) => {
    const options = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    let random = "";
    for (let i = 0; i < len; i++) {
        random = options[Math.floor(Math.random() * options.length)] + random;
    }
    return random;
};
exports.default = randomHash;
