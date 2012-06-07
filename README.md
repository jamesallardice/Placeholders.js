<h1>Placeholders.js - An HTML5 placeholder attribute polyfill</h1>

Placeholders.js is a polyfill (or shim, or whatever you like to call it) for the HTML5 placeholder attribute, as defined in the <a href="http://dev.w3.org/html5/spec/Overview.html#attr-input-placeholder">HTML5 draft specification</a>. Placeholder attributes are valid on `input` elements of various types and `textarea` elements.

<h2>Features</h2>

<ul>
<li>Works on both `input` and `textarea` elements</li>
<li>Works by finding `placeholder` attributes on elements, so there's no need to call it repeatedly for every element. Just add the placeholder attribute as if it were supported natively.</li>
<li>Simulates native styles for the placeholders but keeps any custom styles you've defined on the elements</li>
<li>Placeholder values are not submitted as form data if the element is part of a form</li>
<li>Works for elements that are added to the DOM after the page has loaded, and also for elements whose placeholder value changes after the page has loaded</li>
<li>Wide range of browsers supported, including IE6</li>
<li>No dependencies (so no need to include jQuery, unlike most placeholder polyfill scripts)</li>
<li>All of the above in just over 2kB when minified, and less than 1kB when gzipped!</li>
<li>Passes <a href="http://www.jslint.com/">JSLint</a> with no errors or warnings</li>
</ul>

<h2>How do I use it?</h2>

Placeholders.js is designed to replicate native placeholder attribute functionality as best as it can. To get it working, simply define placeholders on your `input` or `textarea` elements as usual:

    <input type="text" placeholder="Sample text">
    <textarea placeholder="My placeholder"></textarea>
    
Just include the script and call the `init` method whenever you're ready. I suggest calling it in a DOM ready event listener of some description:

    Placeholders.init();
    
That's all there is to it! Browsers that alreay support the placeholder attribute natively will be unaffected. They continue to use their built-in method.

<h2>The `init` method</h2>

The `init` method is all that you need to call to get the polyfill working. It accepts one Boolean argument, `live`. If `true`, this argument causes the polyfill to apply to all `input` and `textarea` elements, both now and in the future. This means if you insert a new element into the DOM, its placeholder attribute will function as expected. If the value of a placeholder attribute is modified by code sometime after the `init` method has executed, `live` will cause the changes to be reflected. If the `live` argument is `false`, the new element would not display its placeholder, and modified placeholder values would not function correctly.

    Placeholders.init(true); //Apply to future and modified elements too
    
<h2>The `refresh` method</h2>

The `refresh` method can be called at any time to update the placeholders defined on elements, and detect any elements recently added to the DOM. You only need to use the `refresh` method if the `live` argument was set to `false` when you called `init`.

    Placeholders.refresh();
    
<h2>Known Issues</h2>

When applying a placeholder to an `input` element of type `password`, the default "hidden" character is used instead of plain text. This issue has been addressed in an experimental version of the polyfill. It works by inserting a new `input` element of type `text` into the DOM just before the `password` input. The new element and the original element are then switched between as necessary. For this reason, you may experience issues with any event handlers bound to the original element, and also with any styles applied to the original element.
    
<h2>Supported Browsers</h2>

Placeholders.js aims to support the widest range of browsers possible. The idea is that you will be able to use the native `placeholder` attribute along with Placeholders.js and your users on any platform will get the same experience. This table will be updated as and when further browsers are tested. Mobile browser testing is a big one that's high on the list. Currently tested and working in the following browsers on (where applicable) both Windows 7 and CentOS 6:

<table>
<tr>
<td rowspan="2">Internet Explorer 6 - 9 (with Placeholders.js)</td>
<td>Firefox 1 - 3 (with Placeholders.js)</td>
<td>Opera 7 - 10(with Placeholders.js)</td>
<td>Safari 3.2 (with Placeholders.js)</td>
</tr>
<tr>
<td>Firefox 4 - 10 (native)</td>
<td>Opera 11 (native)</td>
<td>Safari 4 - 5 (native)</td>
</tr>
<tr>
<td>Flock 1.0 - 2.6.1 (with Placeholders.js)</td>
<td>Konqueror 4.3 (with Placeholders.js)</td>
<td>Chrome 4 - 16 (native)</td>
<td>SeaMonkey 1 - 2 (with Placeholders.js)</td>
</tr>
<tr>
<td>Maxthon 1-2 (with Placeholders.js)</td>
<td>SlimBrowser 5 (with Placeholders.js)</td>
<td>K-Meleon 0.7+ (with Placeholders.js)</td>
</table>