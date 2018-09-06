import { ClassTransformOptions } from "./ClassTransformOptions";
export declare enum TransformationType {
    PLAIN_TO_CLASS = 0,
    CLASS_TO_PLAIN = 1,
    CLASS_TO_CLASS = 2,
}
export declare class TransformOperationExecutor {
    private transformationType;
    private options;
    private transformedTypesMap;
    constructor(transformationType: TransformationType, options: ClassTransformOptions);
    transform(source: Object | Object[] | any, value: Object | Object[] | any, targetType: Function, arrayType: Function, isMap: boolean, level?: number): any;
    private applyCustomTransformations(value, target, key, obj, transformationType);
    private isCircular(object, level);
    private getReflectedType(target, propertyName);
    private getKeys(target, object);
    private checkVersion(since, until);
    private checkGroups(groups);
}
