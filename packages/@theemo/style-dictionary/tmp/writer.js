"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return StyleDictionaryWriter;
    }
});
const _nodefs = /*#__PURE__*/ _interop_require_default(require("node:fs"));
const _nodepath = /*#__PURE__*/ _interop_require_default(require("node:path"));
const _core = require("@theemo/core");
const _utils = require("./utils.js");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class StyleDictionaryWriter {
    write(tokens) {
        const files = this.getFiles(tokens);
        this.writeFiles(files, tokens);
    }
    getFiles(tokens) {
        const files = new Map();
        for (const token of tokens){
            var _files_get;
            const file = this.getFileFromToken(token);
            if (!files.has(file)) {
                files.set(file, new _core.TokenCollection());
            }
            (_files_get = files.get(file)) == null ? void 0 : _files_get.add(token);
        }
        return files;
    }
    getFileFromToken(token) {
        return this.config.fileForToken(token);
    }
    writeFiles(files, allTokens) {
        for (const [file, tokenSet] of files.entries()){
            const contents = {};
            for (const token of tokenSet){
                const property = this.getPathFromToken(token);
                const data = this.buildToken(token, allTokens);
                (0, _utils.set)(contents, property, data);
            }
            this.writeFile(file, contents);
        }
    }
    buildToken(token, allTokens) {
        const data = {
            $value: this.getValue(token, allTokens),
            $description: token.description,
            comment: token.description,
            ...this.getTokenData(token)
        };
        if (token.type) {
            data.$type = token.type;
        }
        return data;
    }
    // private getFolderForGroup(groupName: string) {
    //   return this.config.folderForGroup?.(groupName) ?? groupName;
    // }
    getPathFromToken(token) {
        return this.config.pathForToken(token);
    }
    getValue(token, allTokens) {
        var _this_config_valueForToken, _this_config;
        var _this_config_valueForToken1;
        return (_this_config_valueForToken1 = (_this_config_valueForToken = (_this_config = this.config).valueForToken) == null ? void 0 : _this_config_valueForToken.call(_this_config, token, allTokens)) != null ? _this_config_valueForToken1 : `${token.value}`;
    }
    getTokenData(token) {
        var _this_config_dataForToken, _this_config;
        var _this_config_dataForToken1;
        return (_this_config_dataForToken1 = (_this_config_dataForToken = (_this_config = this.config).dataForToken) == null ? void 0 : _this_config_dataForToken.call(_this_config, token)) != null ? _this_config_dataForToken1 : {};
    }
    writeFile(file, data) {
        const target = `${_nodepath.default.join(this.getDirectory(), file)}.json`;
        const contents = JSON.stringify(data, undefined, '  ');
        const parent = _nodepath.default.dirname(target);
        if (!_nodefs.default.existsSync(parent)) {
            _nodefs.default.mkdirSync(parent, {
                recursive: true
            });
        }
        _nodefs.default.writeFileSync(target, contents);
    }
    getDirectory() {
        var _this_config_directory;
        return (_this_config_directory = this.config.directory) != null ? _this_config_directory : 'tokens';
    }
    constructor(config){
        this.config = config;
    }
}

//# sourceMappingURL=writer.js.map