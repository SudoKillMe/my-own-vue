import Seed from './src/seed.js';

var seed = new Seed('#app', {
    'msg': 'hello',
    'items': ['a', 'b', 'c', 'd'],
    'handle': function () {
        alert('hello');
    }
});
console.log(seed);
