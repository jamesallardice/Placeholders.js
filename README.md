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
<li>All of the above in less than 3kB when minified!</li>
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

When applying a placeholder to an `input` element of type `password`, the default "hidden" character is used instead of plain text.