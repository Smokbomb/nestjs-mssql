"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execution_context_host_1 = require("@nestjs/core/helpers/execution-context.host");
class GqlExecutionContext extends execution_context_host_1.ExecutionContextHost {
    static create(executionContext) {
        return Object.assign({
            getRoot: () => executionContext.getArgByIndex(0),
            getArgs: () => executionContext.getArgByIndex(1),
            getContext: () => executionContext.getArgByIndex(2),
            getInfo: () => executionContext.getArgByIndex(3),
        }, executionContext);
    }
}
exports.GqlExecutionContext = GqlExecutionContext;
