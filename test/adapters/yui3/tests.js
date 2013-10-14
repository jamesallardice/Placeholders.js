setTimeout(function () {

    // Test changing placeholder attribute value
    document.getElementById("handle1").setAttribute("placeholder", "This value has changed");

    // Test created placeholder attribute value
    document.getElementById("handle2").setAttribute("placeholder", "This value has been added");

    // Test input type changing after page load
    try {
        document.getElementById("handle3").type = "password";
    } catch (e) {
        // This will fail in IE < 9
    }

    YUI().use("placeholders", function (Y) {
        alert(Y.one("#p1").get("value"));
        alert(Y.one("#p2").get("value"));
        alert(Y.one("#handle1").get("value"));
        alert(Y.one("#handle2").get("value"));
        alert(Y.one("#handle3").get("value"));
    });

}, 1000);