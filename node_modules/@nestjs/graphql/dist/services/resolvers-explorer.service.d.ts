import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { GqlModuleOptions } from '..';
import { ResolverMetadata } from '../interfaces/resolver-metadata.interface';
import { BaseExplorerService } from './base-explorer.service';
export declare class ResolversExplorerService extends BaseExplorerService {
    private readonly modulesContainer;
    private readonly metadataScanner;
    private readonly externalContextCreator;
    private readonly gqlOptions;
    private readonly gqlParamsFactory;
    constructor(modulesContainer: ModulesContainer, metadataScanner: MetadataScanner, externalContextCreator: ExternalContextCreator, gqlOptions: GqlModuleOptions);
    explore(): any;
    filterResolvers(instance: Object): ResolverMetadata[];
}
