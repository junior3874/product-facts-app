/* eslint-disable no-prototype-builtins */
function createValueByNotation(object: any, path: string, value: any) {
  const keys = path.split(".");

  while (keys.length > 1) {
    const k = keys.shift() as string;

    if (!object.hasOwnProperty(k)) {
      object[k] = {};
    }

    object = object[k];
  }

  object[keys[0]] = value;

  return object;
}

export default createValueByNotation;
