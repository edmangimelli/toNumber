function toNumber(x, customs = {}) {


  if (customs !== Object(customs)) // customs must be an object
    throw 'bad parameter.';


  const defaults = {
    onFail: (originalX, x) => null,

    onSuccess: (x, originalX) => x,

    stringToNumber: x => {
      const stripped = x.replace(/[$%, ]/g, '');
      return stripped === '' ? null : Number(stripped);
    },

    isNumber: x => typeof(x) === 'number' && !Number.isNaN(x) && Number.isFinite(x),

    numberConstraint: x => true,
  };


  const _ = {...defaults, ...customs};

  if (Object.keys(_).length !== Object.keys(defaults).length) // catches typos
    throw 'bad parameter.'

  if (x === Object(x))
    return _.onFail(x, x);


  const originalX = x;
  switch (typeof x) {
  case 'string':
    x = _.stringToNumber(x);
  case 'number':
    if (_.isNumber(x) && _.numberConstraint(x))
      break;
  default:
    return _.onFail(originalX, x);
  }

  return _.onSuccess(x, originalX);
};

module.exports = {toNumber};
