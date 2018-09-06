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
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const external_context_creator_1 = require("@nestjs/core/helpers/external-context-creator");
const modules_container_1 = require("@nestjs/core/injector/modules-container");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const resolvers_enum_1 = require("../enums/resolvers.enum");
const params_factory_1 = require("../factories/params.factory");
const graphql_constants_1 = require("../graphql.constants");
const extract_metadata_util_1 = require("../utils/extract-metadata.util");
const base_explorer_service_1 = require("./base-explorer.service");
let ResolversExplorerService = class ResolversExplorerService extends base_explorer_service_1.BaseExplorerService {
    constructor(modulesContainer, metadataScanner, externalContextCreator, gqlOptions) {
        super();
        this.modulesContainer = modulesContainer;
        this.metadataScanner = metadataScanner;
        this.externalContextCreator = externalContextCreator;
        this.gqlOptions = gqlOptions;
        this.gqlParamsFactory = new params_factory_1.GqlParamsFactory();
    }
    explore() {
        const modules = this.getModules(this.modulesContainer, this.gqlOptions.include || []);
        const resolvers = this.flatMap(modules, instance => this.filterResolvers(instance));
        return this.groupMetadata(resolvers);
    }
    filterResolvers(instance) {
        if (!instance) {
            return undefined;
        }
        const prototype = Object.getPrototypeOf(instance);
        const predicate = (resolverType, isDelegated, isPropertyResolver) => shared_utils_1.isUndefined(resolverType) ||
            isDelegated ||
            (!isPropertyResolver &&
                ![resolvers_enum_1.Resolvers.MUTATION, resolvers_enum_1.Resolvers.QUERY, resolvers_enum_1.Resolvers.SUBSCRIPTION].some(type => type === resolverType));
        const resolvers = this.metadataScanner.scanFromPrototype(instance, prototype, name => extract_metadata_util_1.extractMetadata(instance, prototype, name, predicate));
        return resolvers.filter(resolver => !!resolver).map(resolver => {
            if (resolver.type === graphql_constants_1.SUBSCRIPTION_TYPE) {
                return Object.assign({}, resolver, { callback: instance[resolver.methodName]() });
            }
            const resolverCallback = this.externalContextCreator.create(instance, prototype[resolver.methodName], resolver.methodName, graphql_constants_1.PARAM_ARGS_METADATA, this.gqlParamsFactory);
            return Object.assign({}, resolver, { callback: resolverCallback });
        });
    }
};
ResolversExplorerService = __decorate([
    common_1.Injectable(),
    __param(3, common_1.Inject(graphql_constants_1.GRAPHQL_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer,
        metadata_scanner_1.MetadataScanner,
        external_context_creator_1.ExternalContextCreator, Object])
], ResolversExplorerService);
exports.ResolversExplorerService = ResolversExplorerService;
