import Seed from './src/seed.js';

var seed = new Seed('#app', {
    'msg': 'hello',
    'items': [
        {title: 1},
        {title: 2}
    ],
    'handle': function () {
        alert('hello');
    }
});
console.log(seed);
