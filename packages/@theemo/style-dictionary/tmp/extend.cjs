"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerTheemo", {
    enumerable: true,
    get: function() {
        return registerTheemo;
    }
});
const _w3ctokenjsonparser = require("./parsers/w3c-token-json-parser.js");
const registerTheemo = (styleDictionary)=>{
    styleDictionary.registerParser(_w3ctokenjsonparser.w3cTokenJsonParser);
};

//# sourceMappingURL=extend.js.map