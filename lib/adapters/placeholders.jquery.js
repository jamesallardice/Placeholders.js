(function ($) {

    "use strict";

    var originalValFn = $.fn.val,
        originalPropFn = $.fn.prop;

    if (!Placeholders.nativeSupport) {
        $.fn.val = function (val) {
            if (val === undefined && this.eq(0).data("placeholder-active")) {
                return "";
            }
            return originalValFn.apply(this, arguments);
        };

        $.fn.prop = function (name, val) {
            if (val === undefined && this.eq(0).data("placeholder-active") && name === "value") {
                return "";
            }
            return originalPropFn.apply(this, arguments);
        };
    }

}(jQuery));