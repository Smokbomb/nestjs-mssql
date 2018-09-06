"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransformOperationExecutor_1 = require("../TransformOperationExecutor");
/**
 * Storage all library metadata.
 */
var MetadataStorage = /** @class */ (function () {
    function MetadataStorage() {
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this._typeMetadatas = [];
        this._transformMetadatas = [];
        this._exposeMetadatas = [];
        this._excludeMetadatas = [];
    }
    // -------------------------------------------------------------------------
    // Adder Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.addTypeMetadata = function (metadata) {
        this._typeMetadatas.push(metadata);
    };
    MetadataStorage.prototype.addTransformMetadata = function (metadata) {
        this._transformMetadatas.push(metadata);
    };
    MetadataStorage.prototype.addExposeMetadata = function (metadata) {
        this._exposeMetadatas.push(metadata);
    };
    MetadataStorage.prototype.addExcludeMetadata = function (metadata) {
        this._excludeMetadatas.push(metadata);
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.findTransformMetadatas = function (target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        });
    };
    MetadataStorage.prototype.findExcludeMetadata = function (target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.findExposeMetadata = function (target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.findExposeMetadataByCustomName = function (target, name) {
        return this.getExposedMetadatas(target).find(function (metadata) {
            return metadata.options && metadata.options.name === name;
        });
    };
    MetadataStorage.prototype.findTypeMetadata = function (target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
    };
    MetadataStorage.prototype.getStrategy = function (target) {
        var exclude = this._excludeMetadatas.find(function (metadata) { return metadata.target === target && metadata.propertyName === undefined; });
        var expose = this._exposeMetadatas.find(function (metadata) { return metadata.target === target && metadata.propertyName === undefined; });
        if ((exclude && expose) || (!exclude && !expose))
            return "none";
        return exclude ? "excludeAll" : "exposeAll";
    };
    MetadataStorage.prototype.getExposedMetadatas = function (target) {
        return this.getMetadata(this._exposeMetadatas, target);
    };
    MetadataStorage.prototype.getExcludedMetadatas = function (target) {
        return this.getMetadata(this._excludeMetadatas, target);
    };
    MetadataStorage.prototype.getExposedProperties = function (target, transformationType) {
        return this.getExposedMetadatas(target)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(function (metadata) { return metadata.propertyName; });
    };
    MetadataStorage.prototype.getExcludedProperties = function (target, transformationType) {
        return this.getExcludedMetadatas(target)
            .filter(function (metadata) {
            if (!metadata.options)
                return true;
            if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                return true;
            if (metadata.options.toClassOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
            }
            if (metadata.options.toPlainOnly === true) {
                return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
            }
            return true;
        })
            .map(function (metadata) { return metadata.propertyName; });
    };
    MetadataStorage.prototype.clear = function () {
        this._typeMetadatas = [];
        this._exposeMetadatas = [];
        this._excludeMetadatas = [];
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    MetadataStorage.prototype.getMetadata = function (metadatas, target) {
        var metadataFromTarget = metadatas.filter(function (meta) { return meta.target === target && meta.propertyName !== undefined; });
        var metadataFromChildren = metadatas.filter(function (meta) { return target && target.prototype instanceof meta.target && meta.propertyName !== undefined; });
        return metadataFromChildren.concat(metadataFromTarget);
    };
    MetadataStorage.prototype.findMetadata = function (metadatas, target, propertyName) {
        var metadataFromTarget = metadatas.find(function (meta) { return meta.target === target && meta.propertyName === propertyName; });
        var metadataFromChildren = metadatas.find(function (meta) { return target && target.prototype instanceof meta.target && meta.propertyName === propertyName; });
        return metadataFromTarget || metadataFromChildren;
    };
    MetadataStorage.prototype.findMetadatas = function (metadatas, target, propertyName) {
        var metadataFromTarget = metadatas.filter(function (meta) { return meta.target === target && meta.propertyName === propertyName; });
        var metadataFromChildren = metadatas.filter(function (meta) { return target && target.prototype instanceof meta.target && meta.propertyName === propertyName; });
        return metadataFromChildren.reverse().concat(metadataFromTarget.reverse());
    };
    return MetadataStorage;
}());
exports.MetadataStorage = MetadataStorage;

//# sourceMappingURL=MetadataStorage.js.map
