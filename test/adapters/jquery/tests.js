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
        // The behaviour of `val` as a getter should be patched
        alert($("#jq1").val());
        alert($("#jq2").val());
        alert($("#handle1").val());
        alert($("#handle2").val());
        alert($("#handle3").val());

        // The behaviour of `val` as a setter should not be affected)
        alert($("#jq1").val("set new") instanceof $);
    }, 1000);

}, 1000);