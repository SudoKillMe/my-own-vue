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
    //过滤掉评论标签
    if (node.attributes && node.attributes.length) {
        var attrs = node.attributes;
        each.call(attrs, function (attr) {
            var name = attr.name;
            var value = attr.value;
            if (name.indexOf(prefix) == -1) return;
            var binding = Binding.parse(name.slice(2), value);

            self.bind(node, binding);
        })
    }

}

Seed.prototype.bind = function (node, binding) {
    binding.el = node;
    var key = binding.key;
    var binder = this.bindings[key] || this.createBinder(key);

    binder.instances.push(binding);
}


Seed.prototype.createBinder = function (key) {

    // bindingInstance.el = node;
    var binder = {
        value: '',
        instances: []
    };

    this.bindings[key] = binder;

    Object.defineProperty(this.data, key, {
        get: function () {
            return binder.value;
        },
        set: function (newValue) {
            binder.value = newValue;
            each.call(binder.instances, function (binding) {
                if (binding.filters) {
                    binding.filters.forEach(function (filter) {
                        newValue = Filter[filter].call(null, newValue);
                    });
                }
                binding.update(binding.el, newValue);

            })


        }
    });

    return binder;
}

export default Seed;
