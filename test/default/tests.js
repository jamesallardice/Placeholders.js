var form = document.getElementById('form1');
var newInput = document.createElement('input');

setTimeout(function () {

  // Test changing placeholder attribute value
  document
  .getElementById('handle1')
  .setAttribute('placeholder', 'This value has changed');

  // Test created placeholder attribute value
  document
  .getElementById('handle2')
  .setAttribute('placeholder', 'This value has been added');

  // Test new input element added to the DOM after page load
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('placeholder', 'Test created element');
  document.body.appendChild(newInput);

  // Test input type changing after page load
  try {
    document.getElementById('handle3').type = 'password';
  } catch ( e ) {
    // This will fail in IE < 9
  }

  document.getElementById('handle4').removeAttribute('placeholder');

}, 1000);

// Bind a submit event handler to the test form
function submitHandler( e ) {
  e.returnValue = false;
  return false;
}

if ( form.addEventListener ) {
  form.addEventListener('submit', submitHandler);
} else if ( form.attachEvent ) {
  form.attachEvent('onsubmit', submitHandler);
}
