export default class MissingParans extends Error {
  constructor(paramName) {
    super(`The paran ${paramName} is missing`);
    this.paramName = paramName;
  }
}
