const crypto = require("node:crypto");

const N = Math.pow(2,17);

const maxmem = 144 * 1024 * 1024;

const keyLen = 192;

const saltSize = 64;

/**
 * @return {Buffer}
 */

const generateSalt = () => crypto.randomBytes(saltSize);

/**
 * @param {String} plain
 * @param {Buffer} salt
 * @return {Buffer}
 */

const calcHash = (plain, salt) => {
    const normalized = plain.normalize();
    const hash = crypto.scryptSync(normalized, salt, keyLen, {N, maxmem});
    if (!hash) {
        throw Error("error...");
    }
    return hash;
}

module.exports = {generateSalt, calcHash};