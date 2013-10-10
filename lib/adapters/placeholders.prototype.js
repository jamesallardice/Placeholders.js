(function (F) {

    "use strict";

    var originalGetValueMethod = F.Element.Methods.getValue,
        originalGetValueStatic = F.Element.getValue;

    function getValue(originalFn, elem) {
        if (elem.getAttribute("data-placeholder-active")) {
            return "";
        }
        return originalFn.call(this, elem);
    }

    if (!Placeholders.nativeSupport) {

        // Form.Element.getValue is a static method (the global $F is an alias of this)
        F.Element.getValue = function (elem) {
            return getValue.call(this, originalGetValueStatic, elem);
        };

        // Form.Element.Methods.getValue is available on instances of Element
        Element.addMethods([
            "INPUT",
            "TEXTAREA"
        ], {
            getValue: function (elem) {
                return getValue.call(this, originalGetValueMethod, elem);
            }
        });
    }

}(Form));