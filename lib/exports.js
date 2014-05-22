/* CommonJS */
if (typeof exports == 'object') {
    module.exports = Placeholders;
}
/* AMD module */
else if (typeof define == 'function' && define.amd) {
    define(function() {
        return Placeholders;
    });
}
/* Browser global */
else {
    this.Placeholders = Placeholders;
}
