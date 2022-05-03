export default function dataCombine(type, ...data) {
  let combiningFunction = null;
  let initialValue = null;
  let changeCondition = false;

  switch (type) {
    case 'number':
      combiningFunction = (number, any) => number + Number(any);
      initialValue = 0;
      break;
    case 'string':
      combiningFunction = (string, any) => string + String(any);
      initialValue = '';
      break;
    case 'boolean':
      combiningFunction = (x, y) => x && y;
      initialValue = true;
      break;
    case 'array':
      combiningFunction = (array, any) => array.concat(any);
      initialValue = [];
      break;
    case 'object':
      combiningFunction = (obj1, obj2) => Object.assign(obj1, obj2);
      initialValue = {};
      changeCondition = true;
    // no default
  }

  return combineIntoAny(data, combiningFunction, initialValue, changeCondition);
}

function combineIntoAny(dataArray, combiningFunction, initialValue, changeCondition) {
  let index = 1;
  const combined = dataArray.reduce((accumulator, current) => {
    let temp = current;

    if (!changeCondition) {
      if (typeof temp === 'object' && temp !== null) {
        temp = combineIntoAny(Object.values(temp), combiningFunction, initialValue);
      }
    } else if (typeof temp !== 'object' || temp === null) {
      temp = {};
      temp[`key${index}`] = current;
      index += 1;
    }

    return combiningFunction(accumulator, temp);
  }, initialValue);

  return combined;
}
