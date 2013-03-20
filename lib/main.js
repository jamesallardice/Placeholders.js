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
        badKeys = [37, 38, 39, 40],
        Utils = Placeholders.Utils,
        test = document.createElement("input"),
        head = document.getElementsByTagName("head")[0],
        root = document.documentElement,
        placeholderStyleColor = "#ccc",
        placeholderClassName = "placeholdersjs",
        classNameRegExp = new RegExp("\\b" + placeholderClassName + "\\b"),
        hideOnInput, liveUpdates, keydownVal, styleElem, styleRules, placeholder, inputs, textareas, form, elem, len, i;

    // Returns a function that is used as a focus event handler
    function makeFocusHandler(elem) {
        return function () {
            var type;

            // If the value of the element is the placeholder string we need to remove the placeholder
            if (elem.value === elem.getAttribute("data-placeholder-value")) {

                // Only hide the placeholder value if the (default) hide-on-focus behaviour is enabled
                if (hideOnInput) {

                    // Move the caret to the start of the input (this mimics the behaviour of all browsers that do not hide the placeholder on focus)
                    Utils.moveCaret(elem, 0);

                } else {

                    // Remove the placeholder
                    elem.value = "";
                    elem.className = elem.className.replace(classNameRegExp, "");

                    // If the polyfill has changed the type of the element we need to change it back
                    type = elem.getAttribute("data-placeholder-type");
                    if (type) {
                        elem.type = type;
                    }
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
                elem.value = elem.getAttribute("data-placeholder-value");
                elem.className += " " + placeholderClassName;

                // If the type of element needs to change, change it (e.g. password inputs)
                type = elem.getAttribute("data-placeholder-type");
                if (type) {
                    elem.type = "text";
                }
            }
        };
    }

    // Functions that are used as a event handlers when the hide-on-input behaviour has been activated - very basic implementation of the "input" event
    function makeKeydownHandler(elem) {
        return function (e) {
            keydownVal = elem.value;

            //Prevent the use of the arrow keys (try to keep the cursor before the placeholder)
            return !(keydownVal === elem.getAttribute("data-placeholder-value") && Utils.inArray(badKeys, e.keyCode));
        };
    }
    function makeKeyupHandler(elem) {
        return function () {
            var type;

            if (elem.value !== keydownVal) {

                // Remove the placeholder
                elem.className = elem.className.replace(classNameRegExp, "");
                elem.value = elem.value.replace(elem.getAttribute("data-placeholder-value"), "");

                // If the type of element needs to change, change it (e.g. password inputs)
                type = elem.getAttribute("data-placeholder-type");
                if (type) {
                    elem.type = type;
                }
            }

            // If the element is now empty we need to show the placeholder
            if (elem.value === "") {
                elem.blur();
                Utils.moveCaret(elem, 0);
            }
        };
    }
    function makeClickHandler(elem) {
        return function () {
            if (elem === document.activeElement && elem.value === elem.getAttribute("data-placeholder-value")) {
                Utils.moveCaret(elem, 0);
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
                Utils.addEventListener(form, "submit", makeSubmitHandler(form));
                form.setAttribute("data-placeholder-submit", "true");
            }
        }

        // Bind event handlers to the element so we can hide/show the placeholder as appropriate
        Utils.addEventListener(elem, "focus", makeFocusHandler(elem));
        Utils.addEventListener(elem, "blur", makeBlurHandler(elem));

        // If the placeholder should hide on input rather than on focus we need additional event handlers
        if (hideOnInput) {
            Utils.addEventListener(elem, "keydown", makeKeydownHandler(elem));
            Utils.addEventListener(elem, "keyup", makeKeyupHandler(elem));
            Utils.addEventListener(elem, "click", makeClickHandler(elem));
        }

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

        // Get any settings declared as data-* attributes on the root element (currently the only options are whether to hide the placeholder on focus or input and whether to auto-update)
        hideOnInput = root.getAttribute("data-placeholder-focus") === "false";
        liveUpdates = root.getAttribute("data-placeholder-live") !== "false";

        // Create style element for placeholder styles (instead of directly setting style properties on elements - allows for better flexibility alongside user-defined styles)
        styleElem = document.createElement("style");
        styleElem.type = "text/css";

        // Create style rules as text node
        styleRules = document.createTextNode("." + placeholderClassName + " { color:" + placeholderStyleColor + "; }");

        // Append style rules to newly created stylesheet
        if (styleElem.styleSheet) {
            styleElem.styleSheet.cssText = styleRules.nodeValue;
        } else {
            styleElem.appendChild(styleRules);
        }

        // Prepend new style element to the head (before any existing stylesheets, so user-defined rules take precedence)
        head.insertBefore(styleElem, head.firstChild);

        // Set up the placeholders
        for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
            elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

            // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
            placeholder = elem.getAttribute("placeholder");
            if (placeholder && Utils.inArray(validTypes, elem.type)) {
                newElement(elem);
            }
        }

        // If enabled, the polyfill will repeatedly check for changed/added elements and apply to those as well
        if (liveUpdates) {
            setInterval(function () {
                for (i = 0, len = inputs.length + textareas.length; i < len; i++) {
                    elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length];

                    // Only apply the polyfill if this element is of a type that supports placeholders, and has a placeholder attribute with a non-empty value
                    placeholder = elem.getAttribute("placeholder");
                    if (placeholder && Utils.inArray(validTypes, elem.type)) {

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
    }

}());