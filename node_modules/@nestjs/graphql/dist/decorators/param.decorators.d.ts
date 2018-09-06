import { PipeTransform, Type } from '@nestjs/common';
import 'reflect-metadata';
export declare type ParamData = object | string | number;
export interface ParamsMetadata {
    [prop: number]: {
        index: number;
        data?: ParamData;
    };
}
export declare const Root: () => ParameterDecorator;
export declare const Parent: () => ParameterDecorator;
export declare function Args(): any;
export declare function Args(...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
export declare function Args(property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
export declare function Context(): any;
export declare function Context(...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
export declare function Context(property: string, ...pipes: (Type<PipeTransform> | PipeTransform)[]): any;
export declare function Info(...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator;
