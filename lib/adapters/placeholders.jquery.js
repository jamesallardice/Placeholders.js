(function ($) {

    "use strict";

    var originalValFn = $.fn.val,
        originalPropFn = $.fn.prop;

    if (!Placeholders.nativeSupport) {

        $.fn.val = function (val) {
            var originalValue = originalValFn.apply(this, arguments),
                placeholder = this.eq(0).data("placeholder-value");
            if (val === undefined && this.eq(0).data("placeholder-active") && originalValue === placeholder) {
                return "";
            }
            return originalValue;
        };

        $.fn.prop = function (name, val) {
            if (val === undefined && this.eq(0).data("placeholder-active") && name === "value") {
                return "";
            }
            return originalPropFn.apply(this, arguments);
        };
    }

}(jQuery));
