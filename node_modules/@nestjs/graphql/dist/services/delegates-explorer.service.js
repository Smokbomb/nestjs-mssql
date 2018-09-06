"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const modules_container_1 = require("@nestjs/core/injector/modules-container");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const lodash_1 = require("lodash");
const graphql_constants_1 = require("../graphql.constants");
const extract_metadata_util_1 = require("../utils/extract-metadata.util");
const base_explorer_service_1 = require("./base-explorer.service");
let DelegatesExplorerService = class DelegatesExplorerService extends base_explorer_service_1.BaseExplorerService {
    constructor(modulesContainer, metadataScanner, gqlOptions) {
        super();
        this.modulesContainer = modulesContainer;
        this.metadataScanner = metadataScanner;
        this.gqlOptions = gqlOptions;
    }
    explore() {
        const modules = this.getModules(this.modulesContainer, this.gqlOptions.include || []);
        const delegates = this.flatMap(modules, instance => this.filterDelegates(instance));
        return this.curryDelegates(this.groupMetadata(delegates));
    }
    filterDelegates(instance) {
        if (!instance) {
            return undefined;
        }
        const prototype = Object.getPrototypeOf(instance);
        const predicate = (resolverType, isDelegated) => !isDelegated;
        const resolvers = this.metadataScanner.scanFromPrototype(instance, prototype, name => extract_metadata_util_1.extractMetadata(instance, prototype, name, predicate));
        return resolvers.filter(resolver => !!resolver).map(resolver => {
            const callback = instance[resolver.methodName].bind(instance);
            return Object.assign({}, resolver, { callback });
        });
    }
    curryDelegates(delegates) {
        return mergeInfo => lodash_1.mapValues(delegates, parent => lodash_1.mapValues(parent, (propertyFn, key) => propertyFn()(mergeInfo)));
    }
};
DelegatesExplorerService = __decorate([
    common_1.Injectable(),
    __param(2, common_1.Inject(graphql_constants_1.GRAPHQL_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer,
        metadata_scanner_1.MetadataScanner, Object])
], DelegatesExplorerService);
exports.DelegatesExplorerService = DelegatesExplorerService;
