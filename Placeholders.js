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
 *
 * -----------------------------------------------------------------------------------------------------------------------------------------------------
 *
 * Placeholders is a simple polyfill for the HTML5 "placeholder" attribute. The placeholder attribute can be used on input elements of certain types
 * and provides a short hint (such as a sample value or a brief description) intended to aid the user with data entry. This polyfill has been tested
 * and functions correctly in Internet Explorer 6 and above, Firefox 3.6 and above, Safari 3.2 and above, Opera 9 and above and Chrome 16 and above.
 * The script will be tested in further browsers in due course and the above list edited accordingly.
 *
 * User agents should display the value of the placeholder attribute when the element's value is the empty string and the element does not
 * have focus. The user agents that have implemented support for this attribute all display the placeholder inside the element, as if it were
 * the element's value, in a light grey colour to differentiate between placeholder text and value text.
 *
 * The Placeholders polyfill attempts to replicate the functionality of compliant user agents so that non-compliant user agents will still function
 * as expected when faced with a "placeholder" attribute.
 * 
 * The script is unobtrusive and will only apply if the placeholder attribute is not supported by the user agent in which it is running. To use a placeholder
 * simply add the "placeholder" attribute to a supporting input element:
 *
 * <input type="text" placeholder="Placeholder text">
 *
 * To get this placeholder to function in non-supporting user agents simply call the init method when appropriate (the DOM must be ready for manipulation,
 * unless the "live" argument is true):
 *
 * Placeholders.init();
 *
 * The init method accepts one argument, "live". If live is truthy, the polyfill will apply to all supported input elements now and in the future, and dynamic
 * changes to the placeholder attribute value will be reflected. If live is falsy, the polyfill will only apply to those elements with a placeholder attribute
 * value in the DOM at the time the method is executed. 
 *
 * If the live option is not used, the placeholders can be refreshed manually by calling Placeholders.refresh() */

/*jslint browser: true */

var Placeholders = (function () {

	"use strict";

	/* List of input types that do not support the placeholder attribute. We don't want to modify any input elements with one of these types.
	 * WARNING: If an input type is not supported by a browser, the browser will choose the default type (text) and the placeholder shim will 
	 * apply */
	var invalidTypes = [
		"hidden",
		"datetime",
		"date",
		"month",
		"week",
		"time",
		"datetime-local",
		"range",
		"color",
		"checkbox",
		"radio",
		"file",
		"submit",
		"image",
		"reset",
		"button"
	],

	//"interval" will be used if "live" is true
		interval;

	/* The focusHandler function is executed when input elements with placeholder attributes receive a focus event. If necessary, the placeholder
	 * and its associated styles are removed from the element. */
	function focusHandler(elem) {

		//If the placeholder is currently visible, remove it and its associated styles
		if (elem.value === elem.getAttribute("placeholder")) {

			/* Remove the placeholder class name. Use a regular expression to ensure the string being searched for is a complete word, and not part of a longer
			 * string, on the off-chance a class name including that string also exists on the element */
			elem.className = elem.className.replace(/\bplaceholderspolyfill\b/, "");
			elem.value = "";
		}
	}

	/* The blurHandler function is executed when input elements with placeholder attributes receive a blur event. If necessary, the placeholder
	 * and its associated styles are applied to the element. */
	function blurHandler(elem) {

		//If the input value is the empty string, apply the placeholder and its associated styles
		if (elem.value === "") {
			elem.className = elem.className + " placeholderspolyfill";
			elem.value = elem.getAttribute("placeholder");
		}
	}

	/* The submitHandler function is executed when the containing form, if any, of a given input element is submitted. If necessary, placeholders on any
	 * input element descendants of the form are removed so that the placeholder value is not submitted as the element value. */
	function submitHandler(elem) {
		var inputs = elem.getElementsByTagName("input"),
			textareas = elem.getElementsByTagName("textarea"),
			numInputs = inputs.length,
			num = numInputs + textareas.length,
			element,
			placeholder,
			i;
		//Iterate over all descendant input elements and remove placeholder if necessary
		for (i = 0; i < num; i += 1) {
			element = (i < numInputs) ? inputs[i] : textareas[i - numInputs];
			placeholder = element.getAttribute("placeholder");

			//If the value of the input is equal to the value of the placeholder attribute we need to clear the value
			if (element.value === placeholder) {
				element.value = "";
			}
		}
	}

	//The addEventListeners function binds focus and blur event listeners to the specified input or textarea element.
	function addEventListeners(element) {
		if (element.addEventListener) {
			/* Attach event listeners (W3C style. Anonymous event handler used to be consistent with Microsoft style and make it easier to refer
			 * to element in actual handler function */
			element.addEventListener("focus", function () {
				focusHandler(element);
			}, false);
			element.addEventListener("blur", function () {
				blurHandler(element);
			}, false);
		} else if (element.attachEvent) {
			/* Attach event listeners (Microsoft style - since IE < 9 does not bind the value of "this" to the element that triggered the event,
			 * we need to call the real event handler from an anonymous event handler function and pass in the element) */
			element.attachEvent("onfocus", function () {
				focusHandler(element);
			});
			element.attachEvent("onblur", function () {
				blurHandler(element);
			});
		}
	}

	/* The updatePlaceholders function checks all input and textarea elements and updates the placeholder if necessary. Elements that have been
	 * added to the DOM since the call to createPlaceholders will not function correctly until this function is executed. The same goes for
	 * any existing elements whose placeholder property has been changed (via element.setAttribute("placeholder", "new") for example) */
	function updatePlaceholders() {

		//Declare variables, get references to all input and textarea elements
		var inputs = document.getElementsByTagName("input"),
			textareas = document.getElementsByTagName("textarea"),
			numInputs = inputs.length,
			num = numInputs + textareas.length,
			i,
			element,
			oldPlaceholder,
			newPlaceholder;

		//Iterate over all input and textarea elements and apply/update the placeholder polyfill if necessary
		for (i = 0; i < num; i += 1) {

			//Get the next element from either the input NodeList or the textarea NodeList, depending on how many elements we've already looped through
			element = (i < numInputs) ? inputs[i] : textareas[i - numInputs];

			//Get the value of the placeholder attribute
			newPlaceholder = element.getAttribute("placeholder");

			//Check whether the current input element is of a type that supports the placeholder attribute
			if (invalidTypes.indexOf(element.type) === -1) {

				//The input type does support the placeholder attribute. Check whether the placeholder attribute has a value
				if (newPlaceholder) {

					//The placeholder attribute has a value. Get the value of the current placeholder data-* attribute
					oldPlaceholder = element.getAttribute("data-currentplaceholder");

					//Check whether the placeholder attribute value has changed
					if (newPlaceholder !== oldPlaceholder) {

						//The placeholder attribute value has changed so we need to update. Check whether the placeholder should currently be visible.
						if (element.value === oldPlaceholder || element.value === newPlaceholder || !element.value) {

							//The placeholder should be visible so change the element value to that of the placeholder attribute and set placeholder styles
							element.value = newPlaceholder;
							element.className = element.className + " placeholderspolyfill";
						}

						//If the current placeholder data-* attribute has no value the element wasn't present in the DOM when event handlers were bound, so bind them now
						if (!oldPlaceholder) {
							addEventListeners(element);
						}

						//Update the value of the current placeholder data-* attribute to reflect the new placeholder value
						element.setAttribute("data-currentplaceholder", newPlaceholder);
					}
				}
			}
		}
	}

	/* Make form submit event handler (using factory function to avoid JSLint error) */
	function makeSubmitHandler(form) {
		return function () {
			submitHandler(form);
		};
	}

	/* The createPlaceholders function checks all input and textarea elements currently in the DOM for the placeholder attribute. If the attribute
	 * is present, and the element is of a type (e.g. text) that allows the placeholder attribute, it attaches the appropriate event listeners
	 * to the element and if necessary sets its value to that of the placeholder attribute */
	function createPlaceholders() {

		//Declare variables and get references to all input and textarea elements
		var inputs = document.getElementsByTagName("input"),
			textareas = document.getElementsByTagName("textarea"),
			numInputs = inputs.length,
			num = numInputs + textareas.length,
			i,
			element,
			form,
			placeholder;

		//Iterate over all input elements and apply placeholder polyfill if necessary
		for (i = 0; i < num; i += 1) {

			//Get the next element from either the input NodeList or the textarea NodeList, depending on how many elements we've already looped through
			element = (i < numInputs) ? inputs[i] : textareas[i - numInputs];

			//Get the value of the placeholder attribute
			placeholder = element.getAttribute("placeholder");

			//Check whether or not the current element is of a type that allows the placeholder attribute
			if (invalidTypes.indexOf(element.type) === -1) {

				//The input type does support placeholders. Check that the placeholder attribute has been given a value
				if (placeholder) {

					//The placeholder attribute has a value. Keep track of the current placeholder value in an HTML5 data-* attribute
					element.setAttribute("data-currentplaceholder", placeholder);

					//If the value of the element is the empty string set the value to that of the placeholder attribute and apply the placeholder styles
					if (element.value === "" || element.value === placeholder) {
						element.className = element.className + " placeholderspolyfill";
						element.value = placeholder;
					}

					//If the element has a containing form bind to the submit event so we can prevent placeholder values being submitted as actual values
					if (element.form) {

						//Get a reference to the containing form element (if present)
						form = element.form;

						//The placeholdersubmit data-* attribute is set if this form has already been dealt with
						if (!form.getAttribute("data-placeholdersubmit")) {
							if (form.addEventListener) {
								//The placeholdersubmit attribute wasn't set, so attach a submit event handler (W3C standard style)
								form.addEventListener("submit", makeSubmitHandler(form), false);
							} else if (form.attachEvent) {
								//The placeholdersubmit attribute wasn't set, so attach a submit event handler (Microsoft IE < 9 style)
								form.attachEvent("onsubmit", makeSubmitHandler(form));
							}

							//Set the placeholdersubmit attribute so we don't repeatedly bind event handlers to this form element
							form.setAttribute("data-placeholdersubmit", "true");
						}
					}

					/* Attach event listeners to this element. If the event handlers were bound here, and not in a separate function,
					 * we would need to wrap the loop body in a closure to preserve the value of element for each iteration. */
					addEventListeners(element);
				}
			}
		}
	}

	/* The init function checks whether or not we need to polyfill the placeholder functionality. If we do, it sets up various things
	 * needed throughout the script and then calls createPlaceholders to setup initial placeholders */
	function init(live) {

		//Create an input element to test for the presence of the placeholder property. If the placeholder property exists, stop.
		var test = document.createElement("input"),
			styleElem,
			styleRules,
			i,
			j;

		//Test input element for presence of placeholder property. If it doesn't exist, the browser does not support HTML5 placeholders
		if (typeof test.placeholder === "undefined") {
			//HTML5 placeholder attribute not supported.

			//Create style element for placeholder styles
			styleElem = document.createElement("style");
			styleElem.type = "text/css";

			//Create style rules as text node
			styleRules = document.createTextNode(".placeholderspolyfill { color:#999 !important; }");

			//Append style rules to newly created stylesheet
			if (styleElem.styleSheet) {
				styleElem.styleSheet.cssText = styleRules.nodeValue;
			} else {
				styleElem.appendChild(styleRules);
			}

			//Append new style element to the head
			document.getElementsByTagName("head")[0].appendChild(styleElem);

			//We use Array.prototype.indexOf later, so make sure it exists
			if (!Array.prototype.indexOf) {
				Array.prototype.indexOf = function (obj, start) {
					for (i = (start || 0), j = this.length; i < j; i += 1) {
						if (this[i] === obj) { return i; }
					}
					return -1;
				};
			}

			//Create placeholders for input elements currently part of the DOM
			createPlaceholders();

			/* If the live argument is truthy, call updatePlaceholders repeatedly to keep up to date with any DOM changes.
			 * We use an interval over events such as DOMAttrModified (which are used in some other implementations of the placeholder attribute)
			 * since the DOM level 2 mutation events are deprecated in the level 3 spec. */
			if (live) {
				interval = setInterval(updatePlaceholders, 100);
			}
		}

		//Placeholder attribute already supported by browser :)
		return false;
	}

	//Expose public methods
	return {
		init: init,
		refresh: updatePlaceholders
	};
}());