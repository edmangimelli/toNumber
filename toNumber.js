export const toNumber = (x, customs = {}) => {

  if (customs !== Object(customs))
    throw 'bad parameter.'

  const defaults = {
    onFail: x => null,

    onSuccess: x => x,

    stringToNumber: x => {
      const stripped = x.replace(/[$%, ]/g, '');
      return stripped === '' ? null : Number(stripped);
    },

    isNumber: x => typeof(x) === 'number' && !Number.isNaN(x) && Number.isFinite(x),

    numberConstraint: x => x, 
  }

  const _ = {...defaults, ...customs};

  if (Object.keys(_).length !== Object.keys(defaults).length)
    throw 'bad parameter.'

  switch (typeof x) {
  case 'string':
    x = _.stringToNumber(x);
  case 'number':
    if (_.isNumber(x) && _.numberConstraint(x))
      break;
  default:
    return _.onFail(x);
  }

  return _.onSuccess(x);
};
