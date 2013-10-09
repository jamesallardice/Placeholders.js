(function ($) {

    "use strict";

    var originalValFn = $.fn.val;

    if (!Placeholders.nativeSupport) {
        $.fn.val = function (val) {
            if (val) {
                return originalValFn.call(this, val);
            }
            if (this.eq(0).data("placeholder-active")) {
                return "";
            }
            return originalValFn.call(this);
        };
    }

}(jQuery));