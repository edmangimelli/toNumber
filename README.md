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
let n = toNumber('5000');
let s = n && n.toLocaleString()

// you can write
toNumber('5000', {onSuccess: x => x.toLocaleString()}) 


// also
toNumber('dog', {onFail: x => x}) // dog (instead of null)

toNumber(101, {numberConstraint: x => x < 100, onFail: x => {throw 'Whaaaa??'}})

toNumber(55, {stringToNumber: /* redefine how it interprets strings */})

toNumber(44, {stringToNumber: /* redefine how it converts strings */})

toNumber(33, {isNumber: /* redefine how it defines a number */})
```
