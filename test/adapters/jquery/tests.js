setTimeout(function () {

  // Test changing placeholder attribute value
  document
  .getElementById('handle1')
  .setAttribute('placeholder', 'This value has changed');

  // Test created placeholder attribute value
  document
  .getElementById('handle2')
  .setAttribute('placeholder', 'This value has been added');

  // Test input type changing after page load
  try {
    document.getElementById('handle3').type = 'password';
  } catch ( e ) {
    // This will fail in IE < 9
  }

  setTimeout(function () {

    // The behaviour of `val` and `prop` as getters should be patched
    alert($('#jq1').val() === '');
    alert($('#jq1').prop('value') === '');

    alert($('#jq2').val() === 'Initial value');
    alert($('#jq2').prop('value') === 'Initial value');

    alert($('#handle1').val() === '');
    alert($('#handle1').prop('value') === '');

    alert($('#handle2').val() === '');
    alert($('#handle2').prop('value') === '');

    alert($('#handle3').val() === '');
    alert($('#handle3').prop('value') === '');

    // The behaviour of `val` and `prop` as setters should not be affected)
    alert($('#jq1').val('set new') instanceof $);
    alert($('#handle3').prop('value', 'another new') instanceof $);
  }, 1000);

}, 1000);
