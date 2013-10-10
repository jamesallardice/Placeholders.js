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

    setTimeout(function () {
        // The behaviour of `getValue` as an instance method should be patched
        alert($("p1").getValue());
        alert($("p2").getValue());
        alert($("handle1").getValue());
        alert($("handle2").getValue());
        alert($("handle3").getValue());

        // The behaviour of `getValue` as a static method should be patched
        alert(Form.Element.getValue($("p1")));

        // The behaviour of `$F` as an alias of `getValue` should be patched
        alert($F($("p1")));
    }, 1000);

}, 1000);