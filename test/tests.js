var form = document.getElementById("form1");

setTimeout(function () {

    // Test changing placeholder attribute value
    document.getElementById("handle1").setAttribute("placeholder", "This value has changed");

    // Test created placeholder attribute value
    document.getElementById("handle2").setAttribute("placeholder", "This value has been added");

}, 1000);

// Bind a submit event handler to the test form
function submitHandler(e) {
    e.returnValue = false;
    return false;
}
if (form.addEventListener) {
    form.addEventListener("submit", submitHandler);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", submitHandler);
}