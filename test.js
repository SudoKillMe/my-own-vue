import Seed from './src/seed.js';

var seed = new Seed('#app', {
    'msg' : 'hello',
    'handle': function () {
        alert('hello');
    }
});
console.log(seed);
