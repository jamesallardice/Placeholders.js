var newInput = document.createElement('input');
var input1 = document.getElementById('handle1');
var input2 = document.getElementById('handle2');

setTimeout(function () {

  // Test changing placeholder attribute value
  input1.setAttribute('placeholder', 'This value has changed');

  // Test created placeholder attribute value
  input2.setAttribute('placeholder', 'This value has been added');

  // Test new input element added to the DOM after page load
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('placeholder', 'Test created element');
  document.body.appendChild(newInput);

}, 1000);
