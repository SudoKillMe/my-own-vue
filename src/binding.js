
import Directive from './directive.js'

var KEY_RE = /^[^\|]+/;
var ON_KEY_RE = /(.+):(.+)/;
var FILTER_RE = /\|[^\|]+/g;

function Binding (dirname, express) {
    var binding = {};
    var dir = dirname;

    var key_res = express.match(KEY_RE);
    var key = key_res
        ? key_res[0].trim()
        : null

    var arg_res = key.match(ON_KEY_RE);
    var arg = arg_res
        ? arg_res[1]
        : null
    key = arg_res
        ? arg_res[2]
        : key


    var filter_res = express.match(FILTER_RE);
    var filters = filter_res
        ? filter_res.map(function (filter) {
            return filter.slice(1).trim();
        })
        : null

    if (typeof Directive[dir] == 'function') {
        binding.update = Directive[dir];
    } else {
        binding.update = Directive[dir].update;
        for (var i in Directive[dir]) {
            binding[i] = Directive[dir][i];
        }
    }

    binding.key = key;
    binding.arg = arg;
    binding.filters = filters;
    binding.dir = dir;

    return binding;
}

Binding.parse = function (dirname, express) {
    return new Binding(dirname, express);
}

export default Binding;
