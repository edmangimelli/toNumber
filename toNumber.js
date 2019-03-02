function toNumber(x, customFuncs = {}) {


  if (customFuncs !== Object(customFuncs)) // customFuncs must be an object
    throw 'bad parameter.';


  const defaultFuncs = {

   // in the below functions
   //  x (the original value passed in to toNumber)
   //  n (the result of either numberToNumber, stringToNumber, or otherToNumber)

    numberToNumber: x => n,

    stringToNumber: x => {
      const stripped = x.replace(/[$%, ]/g, '');
      const n = stripped === '' ? null : Number(stripped);
      // ^^^ avoids Number('') which is hilariously == 0
      return n;
    },

    otherToNumber: x => n,


   // the functions below have access to:
   //   x (the original passed in value)
   //   n (the value that should be a number now)

   // n is typically the first argument, and, in most cases, you can just
   // ignore x when writing your own versions of these functions.
   // for example, you might write:
   //   numberConstraint: n => n > 999 && n < 9999
   // instead of:
   //   numberConstraint: (n, x) => n > 999 && n < 9999


    beforeIsNumber: (n, x) => n,


    isNumber: (n, x) =>
      typeof(n) === 'number' && !Number.isNaN(n) && Number.isFinite(n),

    numberConstraint: (n, x) => true,


    onSuccess: (n, x) => n,

    onFail: (x, n) => null, // WATCH OUT. x & n are swapped here
  };


  const func = {...defaultFuncs, ...customFuncs};

  if (Object.keys(func).length !== Object.keys(defaultFuncs).length) // catch typos
    throw 'bad parameter.';



  let n;
  switch (typeof x) {
  case 'number':
    n = func.numberToNumber(x);
  case 'string':
    n = func.stringToNumber(x);
  default:
    n = func.otherToNumber(x);
  }


  n = func.beforeIsNumber(n);



  if (func.isNumber(n) && func.numberConstraint(n))
    return func.onSuccess(n, x);
  return func.onFail(x, n);
};


module.exports = {toNumber};
