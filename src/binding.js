
import Directive from './directive.js'

var KEY_RE = /^[^\|]+/;
var ON_KEY_RE = /(.+):(.+)/;
var FILTER_RE = /\|[^\|]+/g;

function Binding (dirname, express) {
    // if (dirname.indexOf('v-') == -1) return;
    // dirname = dirname.slice(2);
    var key_re = express.match(KEY_RE);
    console.log(express);
    var _key = key_re[0].match(ON_KEY_RE);
    var key = _key
        ? _key[2]
        : key_re[0];
    var arg = _key
            ? _key[1]
            : null;

    var filter_re = express.match(FILTER_RE);
    var filters = filter_re
            ? filter_re.map(function (filter) {
                return filter.slice(1).trim();
            })
            : [];
    return {
        key: key.trim(),
        filters: filters,
        arg: arg,
        dir: dirname,
        update: typeof Directive[dirname] == 'function'
                         ? Directive[dirname]
                         : Directive[dirname].update
    };
}

Binding.parse = function (dirname, express) {
    return new Binding(dirname, express);
}

export default Binding;
