"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("../../");
/**
 * Wraps some method into the transaction.
 *
 * Method result will return a promise if this decorator applied.
 * All database operations in the wrapped method should be executed using entity managed passed
 * as a first parameter into the wrapped method.
 *
 * If you want to control at what position in your method parameters entity manager should be injected,
 * then use @TransactionEntityManager() decorator.
 *
 * If you want to use repositories instead of bare entity manager,
 * then use @TransactionRepository() decorator.
 */
function Transaction(connectionName) {
    if (connectionName === void 0) { connectionName = "default"; }
    return function (target, methodName, descriptor) {
        // save original method - we gonna need it
        var originalMethod = descriptor.value;
        // override method descriptor with proxy method
        descriptor.value = function () {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _1.getConnection(connectionName).manager.transaction(function (entityManager) {
                var argsWithInjectedTransactionManagerAndRepositories;
                // filter all @TransactionEntityManager() and @TransactionRepository() decorator usages for this method
                var transactionEntityManagerMetadatas = _1.getMetadataArgsStorage()
                    .filterTransactionEntityManagers(target.constructor, methodName)
                    .reverse();
                var transactionRepositoryMetadatas = _1.getMetadataArgsStorage()
                    .filterTransactionRepository(target.constructor, methodName)
                    .reverse();
                // if there are @TransactionEntityManager() decorator usages the inject them
                if (transactionEntityManagerMetadatas.length > 0) {
                    argsWithInjectedTransactionManagerAndRepositories = args.slice();
                    // replace method params with injection of transactionEntityManager
                    transactionEntityManagerMetadatas.forEach(function (metadata) {
                        argsWithInjectedTransactionManagerAndRepositories.splice(metadata.index, 0, entityManager);
                    });
                }
                else if (transactionRepositoryMetadatas.length === 0) { // otherwise if there's no transaction repositories in use, inject it as a first parameter
                    argsWithInjectedTransactionManagerAndRepositories = [entityManager].concat(args);
                }
                else {
                    argsWithInjectedTransactionManagerAndRepositories = args.slice();
                }
                // for every usage of @TransactionRepository decorator
                transactionRepositoryMetadatas.forEach(function (metadata) {
                    var repositoryInstance;
                    // detect type of the repository and get instance from transaction entity manager
                    switch (metadata.repositoryType) {
                        case _1.Repository:
                            repositoryInstance = entityManager.getRepository(metadata.entityType);
                            break;
                        case _1.MongoRepository:
                            repositoryInstance = entityManager.getMongoRepository(metadata.entityType);
                            break;
                        case _1.TreeRepository:
                            repositoryInstance = entityManager.getTreeRepository(metadata.entityType);
                            break;
                        // if not the TypeORM's ones, there must be custom repository classes
                        default:
                            repositoryInstance = entityManager.getCustomRepository(metadata.repositoryType);
                    }
                    // replace method param with injection of repository instance
                    argsWithInjectedTransactionManagerAndRepositories.splice(metadata.index, 0, repositoryInstance);
                });
                return originalMethod.apply(_this, argsWithInjectedTransactionManagerAndRepositories);
            });
        };
    };
}
exports.Transaction = Transaction;

//# sourceMappingURL=Transaction.js.map
