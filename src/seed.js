import Binding from './binding.js'
import Filter from './filter.js'
var prefix = 'v-';


var each = Array.prototype.forEach;
var map = Array.prototype.map;

function Seed (el, data) {
    this.el = el;
    this.bindings = {};
    this.data = {};
    // for (var i in data) {
    //     this.data[i] = data[i];
    // }
    if (typeof el == 'string') {
        el = document.querySelector(el);
    }

    this.compileNode(el);

    for (var i in data) {
        this.data[i] = data[i];
    }

}

Seed.prototype.compileNode = function (node) {
    var self = this;
    if (node.nodeType == 3) return;
    if (node.childNodes) {
        each.call(node.childNodes, function (child) {
            self.compileNode(child);
        });
    }
    var attrs = node.attributes;
    each.call(attrs, function (attr) {
        var name = attr.name;
        var value = attr.value;
        if (name.indexOf(prefix) == -1) return;
        var binding = Binding.parse(name.slice(2), value);
        //放在这个地方是为了防止"多个标签都有同一个指令时，只有第一个指令含有el属性"
        binding.el = node;
        var binder = self.bindings[name.slice(2)] || self.createBinder(node, binding);
                // ? self.bindings[name]
                // : self.createBinder(node, binding);

        binder.bindingInstances.push(binding);
    })

}

Seed.prototype.createBinder = function (node, bindingInstance) {

    // bindingInstance.el = node;
    var binder = {
        value: '',
        bindingInstances: []
    };

    this.bindings[bindingInstance.dir] = binder;

    Object.defineProperty(this.data, bindingInstance.key, {
        get: function () {
            return binder.value;
        },
        set: function (newValue) {
            binder.value = newValue;
            bindingInstance.filters.forEach(function (filter) {
                newValue = Filter[filter](newValue);
            });
            each.call(binder.bindingInstances, function (bindingInstance) {
                if (bindingInstance.arg) {
                    bindingInstance.update(bindingInstance.el, newValue, bindingInstance.arg);
                } else {
                    bindingInstance.update(bindingInstance.el, newValue);
                }
            })


        }
    });

    return binder;
}

export default Seed;
