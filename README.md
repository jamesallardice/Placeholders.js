#Placeholders.js - An HTML5 placeholder attribute polyfill

Placeholders.js is a polyfill (or shim, or whatever you like to call it) for
the HTML5 placeholder attribute, as defined in the [HTML5 specification][spec].
Placeholder attributes are valid on `input` elements of various types and
`textarea` elements.

Placeholders.js is licensed under the [MIT License][license]. See the
unminified file for the full license text.

## Get it!

Download the polyfill and get a whole load of information and instructions at
[our new website][site]. If you're using Ruby on Rails, you can also try out
[our gem][gem].

##Supported Browsers

Placeholders.js aims to support the widest range of browsers possible. The idea
is that you will be able to use the native `placeholder` attribute along with
Placeholders.js and your users on any platform will get the same experience.
This table will be updated as and when further browsers are tested. Mobile
browser testing is a big one that's high on the list. Currently tested and
working in the following browsers on (where applicable) both Windows 7 and
CentOS 6:

 - Internet Explorer 6 - 9 (with Placeholders.js)
 - Firefox 1 - 3 (with Placeholders.js), 4+ (native)
 - Opera 7 - 10 (with Placeholders.js), 11+ (native)
 - Safari 3.2 (with Placeholders.js), 4+ (native)
 - Chrome 4+ (native)
 - Flock 1.0+ (with Placeholders.js)
 - Konqueror 4.3 (with Placeholders.js)
 - SeaMonkey 1+ (with Placeholders.js)
 - Maxthon 1+ (with Placeholders.js)
 - SlimBrowser 5 (with Placeholders.js)
 - K-Meleon 0.7+ (with Placeholders.js)

Do you use some obscure browser that doesn't have native `placeholder` attribute
support? If so, please let me know so I can make sure Placeholders.js works with
it.

[spec]: http://dev.w3.org/html5/spec/Overview.html#attr-input-placeholder
[license]: http://en.wikipedia.org/wiki/MIT_License
[site]: http://jamesallardice.github.com/Placeholders.js/
[gem]: https://github.com/ets-berkeley-edu/placeholder-gem
