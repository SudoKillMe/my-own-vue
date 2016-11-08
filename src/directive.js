import Seed from './seed.js'
export default {
    text: function (el, value) {
        el.textContent = value;
    },
    on: {
        update: function (el, fn, arg) {
            el.addEventListener(arg, fn);
        }
    },
    each: {
    	update: function (el, items, item) {
    		
    		var node;
    		el.removeAttribute('v-each');
    		for (var i=0; i<items.length; i++) {
    			node = el.cloneNode(true);
    			el.parentNode.appendChild(node);
    			new Seed(node, {
    				item: items[i]
    			});
    		}
    		el.parentNode.removeChild(el);
    	}
    }

}
