export default class ApiNotFoundError extends Error {
  constructor() {
    const message = "Server is inactive";
    super(message);
  }
}
