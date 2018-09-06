"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
require("reflect-metadata");
const gql_paramtype_enum_1 = require("../enums/gql-paramtype.enum");
const graphql_constants_1 = require("../graphql.constants");
const assignMetadata = (args, paramtype, index, data, ...pipes) => (Object.assign({}, args, { [`${paramtype}:${index}`]: {
        index,
        data,
        pipes,
    } }));
const createParamDecorator = (paramtype) => {
    return (data) => (target, key, index) => {
        const args = Reflect.getMetadata(graphql_constants_1.PARAM_ARGS_METADATA, target.constructor, key) || {};
        Reflect.defineMetadata(graphql_constants_1.PARAM_ARGS_METADATA, assignMetadata(args, paramtype, index, data), target.constructor, key);
    };
};
const createPipesParamDecorator = (paramtype) => (data, ...pipes) => (target, key, index) => {
    const args = Reflect.getMetadata(graphql_constants_1.PARAM_ARGS_METADATA, target.constructor, key) || {};
    const hasParamData = shared_utils_1.isNil(data) || shared_utils_1.isString(data);
    const paramData = hasParamData ? data : undefined;
    const paramPipes = hasParamData ? pipes : [data, ...pipes];
    Reflect.defineMetadata(graphql_constants_1.PARAM_ARGS_METADATA, assignMetadata(args, paramtype, index, paramData, ...paramPipes), target.constructor, key);
};
exports.Root = createParamDecorator(gql_paramtype_enum_1.GqlParamtype.ROOT);
exports.Parent = createParamDecorator(gql_paramtype_enum_1.GqlParamtype.ROOT);
function Args(property, ...pipes) {
    return createPipesParamDecorator(gql_paramtype_enum_1.GqlParamtype.ARGS)(property, ...pipes);
}
exports.Args = Args;
function Context(property, ...pipes) {
    return createPipesParamDecorator(gql_paramtype_enum_1.GqlParamtype.CONTEXT)(property, ...pipes);
}
exports.Context = Context;
function Info(...pipes) {
    return createPipesParamDecorator(gql_paramtype_enum_1.GqlParamtype.INFO)(undefined, ...pipes);
}
exports.Info = Info;
