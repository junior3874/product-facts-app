export default class MissingParams extends Error {
  constructor(params) {
    const gettingParamNames = Object.keys(params).join(", ");
    super(`The params ${gettingParamNames} is missing`);
    this.undefinedParams = params;
  }
}
