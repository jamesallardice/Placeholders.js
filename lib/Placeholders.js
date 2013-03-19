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
        head = document.getElementsByTagName("head")[0],
        placeholderStyleColor = "#ccc",
        placeholderClassName = "placeholdersjs",
        classNameRegExp = new RegExp("\\b" + placeholderClassName + "\\b"),
        styleElem, styleRules, placeholder, inputs, textareas, form, elem, len, i;

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
                elem.className = elem.className.replace(classNameRegExp, "");

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
                elem.className += " " + placeholderClassName;

                // If the type of element needs to change, change it (e.g. password inputs)
                type = elem.getAttribute("data-placeholder-type");
                if (type) {
                    elem.type = "text";
                }
            }
        };
    }

    // Returns a function that is used as a submit event handler on form elements that have children affected by this polyfill
    function makeSubmitHandler(form) {
        return function () {

            // Get references to all the input and textarea elements that are descendants of this form
            var inputs = form.getElementsByTagName("input"),
                textareas = form.getElementsByTagName("textarea"),
                elem, len, i;

            // If the value of any of those elements is the corresponding placeholder string, clear the value
            for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
                elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];
                if (elem.value === elem.getAttribute("placeholder")) {
                    elem.value = "";
                }
            }
        };
    }

    // Bind event handlers to an element that we need to affect with the polyfill
    function newElement(elem) {

        // If the element is part of a form, make sure the placeholder string is not submitted as a value
        if (elem.form) {
            form = elem.form;

            // Set a flag on the form so we know it's been handled (forms can contain multiple inputs)
            if (!form.getAttribute("data-placeholder-submit")) {
                addEventListener(form, "submit", makeSubmitHandler(form));
                form.setAttribute("data-placeholder-submit", "true");
            }
        }

        // Bind event handlers to the element so we can hide/show the placeholder as appropriate
        addEventListener(elem, "focus", makeFocusHandler(elem));
        addEventListener(elem, "blur", makeBlurHandler(elem));

        // Remember that we've bound event handlers to this element
        elem.setAttribute("data-placeholder-bound", "true");

        // If the element doesn't have a value, set it to the placeholder string
        if (elem.value === "") {
            elem.value = placeholder;
            elem.className += " " + placeholderClassName;
        }
    }

    if (test.placeholder === void 0) {

        // Get references to all the input and textarea elements currently in the DOM (live NodeList objects to we only need to do this once)
        inputs = document.getElementsByTagName("input");
        textareas = document.getElementsByTagName("textarea");

        //Create style element for placeholder styles
        styleElem = document.createElement("style");
        styleElem.type = "text/css";

        //Create style rules as text node
        styleRules = document.createTextNode("." + placeholderClassName + " { color:" + placeholderStyleColor + "; }");

        //Append style rules to newly created stylesheet
        if (styleElem.styleSheet) {
            styleElem.styleSheet.cssText = styleRules.nodeValue;
        } else {
            styleElem.appendChild(styleRules);
        }

        //Append new style element to the head
        head.insertBefore(styleElem, head.firstChild);

        // Set up the placeholders
        for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
            placeholder = elem.getAttribute("placeholder");
            if (placeholder && inArray(validTypes, elem.type)) {
                newElement(elem);
            }
        }

        setInterval(function () {
            for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
                elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

                // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                placeholder = elem.getAttribute("placeholder");
                if (placeholder && inArray(validTypes, elem.type)) {

                    // If the element hasn't had event handlers bound to it then add them
                    if (!elem.getAttribute("data-placeholder-bound")) {
                        newElement(elem);
                    }

                    // If the placeholder value has changed or not been initialised yet we need to update the display
                    if (placeholder !== elem.getAttribute("data-placeholder-value")) {

                        // Attempt to change the type of password inputs (fails in IE < 9)
                        if (elem.type === "password") {
                            try {
                                elem.type = "text";
                                elem.setAttribute("data-placeholder-type", "password");
                            } catch (e) {
                                // This is empty on purpose. In IE < 9 we just move on and display the placeholder as masked text.
                            }
                        }

                        // If the placeholder value has changed and the placeholder is currently on display we need to change it
                        if (elem.value === elem.getAttribute("data-placeholder-value")) {
                            elem.value = placeholder;
                        }

                        // Keep a reference to the current placeholder value in case it changes via another script
                        elem.setAttribute("data-placeholder-value", placeholder);
                    }
                }
            }
        }, 100);
    }

}());