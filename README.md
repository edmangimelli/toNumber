# toNumber
simple but flexible toNumber function for JavaScript

```
toNumber(1) // 1
toNumber('3434') // 3434
toNumber({}) // null
toNumber() // null
toNumber('') // null
toNumber('123abc') // null
toNumber('$ 1 , 000 .  00') // 1000



// instead of
const num = toNumber('5000');
const str = n && n.toLocaleString();

// you can write
const str = toNumber('5000', {onSuccess: x => x.toLocaleString()});



// also
toNumber('dog', {onFail: x => x}); // dog (instead of null)

toNumber(101, {numberConstraint: x => x < 100, onFail: x => {throw 'Whaaaa??'}});

toNumber(55, {stringToNumber: /* redefine how it interprets strings */});

toNumber(33, {isNumber: /* redefine how it defines a number */});



// an example of how you might actually use it

number = x => toNumber(x, {onSuccess: x => x.toLocaleString(), onFail: x => ''});

// i.e. just tweak it for your current needs (maybe even just the current scope)

```
