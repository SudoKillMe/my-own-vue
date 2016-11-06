export default {
    text: function (el, value) {
        el.textContent = value;
    },
    on: {
        update: function (el, fn, arg) {
            el.addEventListener(arg, fn);
        }
    }

}
