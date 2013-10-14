(function (F) {

    "use strict";

    var originalGetValueMethod = F.Element.Methods.getValue,
        originalGetValueStatic = F.Element.getValue,
        originalGlobal = $F;

    function getValue(originalFn, elem) {
        if (elem.getAttribute("data-placeholder-active")) {
            return "";
        }
        return originalFn.call(this, elem);
    }

    if (!Placeholders.nativeSupport) {

        $F = function (elem) {
            return getValue.call(this, originalGlobal, elem);
        };

        F.Element.getValue = function (elem) {
            return getValue.call(this, originalGetValueStatic, elem);
        };

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