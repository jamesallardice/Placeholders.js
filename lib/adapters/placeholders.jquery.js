(function ($) {

    "use strict";

    var originalValFn = $.fn.val;

    if (!Placeholders.nativeSupport) {
        $.fn.val = function (val) {
            if (val === undefined && this.eq(0).data("placeholder-active")) {
                return "";
            }
            return originalValFn.call(this);
        };
    }

}(jQuery));