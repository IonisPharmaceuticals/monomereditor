System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ResultTableManager;
    return {
        setters: [],
        execute: function () {
            ResultTableManager = (function () {
                function ResultTableManager() {
                    this.tableListeners = new Array();
                }
                ResultTableManager.prototype.notifyInteractionListeners = function (data) {
                    for (var _i = 0, _a = this.tableListeners; _i < _a.length; _i++) {
                        var tablel = _a[_i];
                        tablel.setSelectedRow(data);
                    }
                };
                ResultTableManager.prototype.addListener = function (listener) {
                    this.tableListeners.push(listener);
                };
                return ResultTableManager;
            }());
            exports_1("ResultTableManager", ResultTableManager);
        }
    };
});
//# sourceMappingURL=result_table_manager.js.map