( function ( $, global ) {

  'use strict';

  var originalValFn = $.fn.val;
  var originalPropFn = $.fn.prop;

  if ( !global.Placeholders.nativeSupport ) {

    $.fn.val = function ( val ) {
      var originalValue = originalValFn.apply(this, arguments);
      var placeholder = this.eq(0).data('placeholder-value');
      if (
        val === undefined &&
        this.eq(0).data('placeholder-active') &&
        originalValue === placeholder
      ) {
        return '';
      }
      return originalValue;
    };

    $.fn.prop = function ( name, val ) {
      if (
        val === undefined &&
        this.eq(0).data('placeholder-active') &&
        name === 'value'
      ) {
        return '';
      }
      return originalPropFn.apply(this, arguments);
    };
  }
}(jQuery, this) );
