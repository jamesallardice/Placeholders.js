(function (YUI) {

    "use strict";

    YUI.add("placeholders", function (Y) {
        var originalGetFn = Y.Node.prototype.get;
        Y.Node.prototype.get = function (attr) {
            if (attr === "value" && this.getAttribute("data-placeholder-active")) {
                return "";
            }
            return originalGetFn.apply(this, arguments);
        };
    }, "3.0.0", {
        requires: [
            "node"
        ]
    });

}(YUI));