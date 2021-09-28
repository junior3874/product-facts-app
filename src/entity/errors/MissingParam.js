export default class MissingParam extends Error {
  constructor(paramName) {
    super(`The param ${paramName} is missing`);
  }
}
