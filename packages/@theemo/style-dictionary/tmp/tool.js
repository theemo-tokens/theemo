"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "styleDictionaryWriter", {
    enumerable: true,
    get: function() {
        return styleDictionaryWriter;
    }
});
const _writer = /*#__PURE__*/ _interop_require_default(require("./writer.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function styleDictionaryWriter(config) {
    return new _writer.default(config);
}

//# sourceMappingURL=tool.js.map