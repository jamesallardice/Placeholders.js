/* 
 * The MIT License
 *
 * Copyright (c) 2012 James Allardice
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

 /*jshint browser: true */

(function () {

    "use strict";

    var validTypes = [
            "text",
            "search",
            "url",
            "tel",
            "email",
            "password",
            "number",
            "textarea"
        ],
        test = document.createElement("input"),
        elems = [],
        placeholder, inputs, textareas, form, elem, len, i;

    // Utility function (alternative to Array.prototype.indexOf which isn't supported by older browsers)
    function inArray(arr, item) {
        var i, len;
        for (i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return true;
            }
        }
        return false;
    }

    // Cross-browser DOM event binding
    function addEventListener(elem, event, fn) {
        if (elem.addEventListener) {
            return elem.addEventListener(event, fn, false);
        }
        if (elem.attachEvent) {
            return elem.attachEvent("on" + event, fn);
        }
    }

    // Returns a function that is used as a focus event handler
    function makeFocusHandler(elem) {
        return function () {
            var type;

            // If the value of the element is the placeholder string we need to remove the placeholder
            if (elem.value === elem.getAttribute("placeholder")) {
                elem.value = "";

                // If the polyfill has changed the type of the element we need to change it back
                type = elem.getAttribute("data-placeholder-type");
                if (type) {
                    elem.type = type;
                }
            }
        };
    }

    // Returns a function that is used as a blur event handler
    function makeBlurHandler(elem) {
        return function () {
            var type;

            // If the element doesn't have a value we need to show the placeholder
            if (elem.value === "") {
                elem.value = elem.getAttribute("placeholder");

                // If the type of element needs to change, change it (e.g. password inputs)
                type = elem.getAttribute("data-placeholder-type");
                if (type) {
                    elem.type = "text";
                }
            }
        };
    }

    // Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
    function makeSubmitHandler(elem) {
        return function () {
            var inputs, len, i;

            // Get references to all the input and textarea elements that are descendants of this form
            inputs = [].slice.call(elem.getElementsByTagName("input"), 0);
            inputs.concat([].slice.call(elem.getElementsByTagName("textarea"), 0));

            // If the value of any of those elements is the corresponding placeholder string, clear the value
            for (i = 0, len = inputs.length; i < len; i++) {
                if (inputs[i].value === inputs[i].getAttribute("placeholder")) {
                    inputs[i].value = "";
                }
            }
        };
    }

    if (test.placeholder === void 0) {

        // Get references to all the input and textarea elements currently in the DOM
        inputs = document.getElementsByTagName("input");
        textareas = document.getElementsByTagName("textarea");

        for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
            placeholder = elem.getAttribute("placeholder");
            if (placeholder && inArray(validTypes, elem.type)) {

                // Attempt to change the type of password inputs (fails in IE < 9, in which we have no choice but to display the placeholder text in masked password style)
                if (elem.type === "password") {
                    try {
                        elem.type = "text";
                        elem.setAttribute("data-placeholder-type", "password");
                    } catch (e) { 
                        // This is empty on purpose
                    }
                }

                elem.setAttribute("data-placeholder-value", placeholder);

                // If the element doesn't have a value, set it to the placeholder string
                if (elem.value === "") {
                    elem.value = placeholder;
                }

                // If the element is part of a form, make sure the placeholder string is not submitted as a value
                if (elem.form) {
                    form = elem.form;

                    // Set a flag on the form so we know it's been handled (forms can contain multiple inputs)
                    if (!form.getAttribute("data-placeholder-submit")) {
                        addEventListener(form, "submit", makeSubmitHandler(elem));
                        form.setAttribute("data-placeholder-submit", "true");
                    }
                }

                // Bind event handlers to the element so we can hide/show the placeholder as appropriate
                addEventListener(elem, "focus", makeFocusHandler(elem));
                addEventListener(elem, "blur", makeBlurHandler(elem));
            }
        }
    }

}());