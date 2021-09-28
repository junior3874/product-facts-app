import MissingParams from "../../../entity/errors/MissingParams";

export default function verifyFieldsThatNotExists(fields) {
  const fieldNames = Object.keys(fields);
  const validationFields = Object.values(fields).reduce(
    (acumulator, field, index) => {
      if (!field) {
        acumulator[`${fieldNames[index]}`] = field;
        return acumulator;
      }
      return acumulator;
    },
    {}
  );

  if (Object.keys(validationFields).length > 0)
    throw new MissingParams(validationFields);
}
