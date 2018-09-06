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
const graphql_constants_1 = require("../graphql.constants");
const base_explorer_service_1 = require("./base-explorer.service");
let ScalarsExplorerService = class ScalarsExplorerService extends base_explorer_service_1.BaseExplorerService {
    constructor(modulesContainer, gqlOptions) {
        super();
        this.modulesContainer = modulesContainer;
        this.gqlOptions = gqlOptions;
    }
    explore() {
        const modules = this.getModules(this.modulesContainer, this.gqlOptions.include || []);
        return this.flatMap(modules, instance => this.filterScalar(instance));
    }
    filterScalar(instance) {
        if (!instance) {
            return undefined;
        }
        const scalarName = Reflect.getMetadata(graphql_constants_1.SCALAR_NAME_METADATA, instance.constructor);
        return scalarName
            ? {
                [scalarName]: instance,
            }
            : undefined;
    }
};
ScalarsExplorerService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(graphql_constants_1.GRAPHQL_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [modules_container_1.ModulesContainer, Object])
], ScalarsExplorerService);
exports.ScalarsExplorerService = ScalarsExplorerService;
