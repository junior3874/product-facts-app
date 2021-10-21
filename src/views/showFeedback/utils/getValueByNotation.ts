function getValueByNotation(obj: Object, path: string) {
  return new Function("_", "return _." + path)(obj);
}

export default getValueByNotation;
